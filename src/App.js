import React, { Component } from 'react';
import dataApi from './components/utils/dataApi';
import SearchBar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button.jsx';
import Notification from './components/Notification/Notification';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import './App.css';

class App extends Component {
  state = {
    data: [],
    loading: false,
    error: null,
    query: '',
    page: 1,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.data);

    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.fetchData();
    }
    if (prevPage !== newPage && prevPage !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }
  fetchData = () => {
    const { query, page } = this.state;
    this.setState({ loading: true });
    dataApi
      .fetchDataWithQuery(query, page)
      .then(result =>
        this.setState(prevState => ({
          data: [...prevState.data, ...result],
          page: prevState.page + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSubmit = searchQuery => {
    this.setState({ query: searchQuery, page: 1, data: [] });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };
  getLargeImg = image => {
    this.setState({
      largeImageURL: image,
    });
  };
  closeModal = () => {
    this.setState({
      largeImageURL: '',
    });
  };

  render() {
    const { data, loading, error, largeImageURL } = this.state;
    console.log(data);
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {error && (
          <Notification
            message={`Oops, something went wrong: ${error.message}`}
          />
        )}
        {loading && <Loader />}
        {data.length > 0 && (
          <ImageGallery data={data} getLargeImg={this.getLargeImg} />
        )}
        {data.length > 0 && !loading && <Button fetchData={this.fetchData} />}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
export default App;
