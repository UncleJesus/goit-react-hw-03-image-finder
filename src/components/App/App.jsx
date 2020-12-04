import React, { Component } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Load from "../Loader/Loader";
import Modal from "../Modal/Modal";
import getData from "../../service/API.js";
import "./App.css";

class App extends Component {
  state = {
    pictures: [],
    loading: false,
    error: null,
    query: "",
    page: 1,
    target: "",
    isOpen: false,
    height: 0,
  };

  componentDidUpdate = (prevProps, prevState) => {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    if (prevQuery !== nextQuery) {
      this.getFetch();
    } else if (prevQuery === nextQuery) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  onSubmit = (query, page) => {
    this.setState({ query: query, page: 1, pictures: [] });
  };

  getFetch = () => {
    const { query, page } = this.state;
    this.setState({ loading: true });

    getData(query, page)
      .then((res) => {
        this.setState((prevState) => ({
          pictures: [...prevState.pictures, ...res.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() =>
        this.setState({
          height: document.documentElement.scrollHeight,
          loading: false,
        })
      );
  };

  openModal = (query) => {
    this.setState({ isOpen: true, target: query });
  };

  onClick = () => {
    this.setState({ isOpen: false, target: "" });
  };

  onClose = ({ key }) => {
    if (key === "Escape") {
      this.onClick();
    }
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          openModal={this.openModal}
          pictures={this.state.pictures}
        />
        {this.state.loading && <Load />}
        {this.state.pictures.length > 0 && !this.state.loading && (
          <Button onClick={this.getFetch} />
        )}
        {this.state.isOpen && (
          <Modal
            onClick={this.onClick}
            onClose={this.onClose}
            target={this.state.target}
          />
        )}
      </>
    );
  }
}

export default App;
