import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Searchbar extends Component {

  state = {
    value: "",
    page: 1
  };

  setQuery = (event) => {

    event.preventDefault();
    this.props.onSubmit(this.state.value, this.state.page);

  };

  handleChange = ({target}) => {

    this.setState({value: target.value});

  };

  render () {
    return (<header className="Searchbar">
      <form className="SearchForm" onSubmit={this.setQuery}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          placeholder="Search images and photos"
          onChange={this.handleChange}
          value={this.state.value}
        />
      </form>
    </header>);
  };
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
