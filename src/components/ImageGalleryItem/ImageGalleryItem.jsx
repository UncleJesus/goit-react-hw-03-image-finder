import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { Test } from './ImageGalleryItem.styles';

class ImageGalleryItem extends Component { 

  setObj = (query) => {
    this.props.openModal(query);
  }

  render () {
    
    const {pictures} = this.props;

    return (
      pictures.map(el => 
      <li key={el.id} className="ImageGalleryItem" onClick={() => {this.setObj(el.largeImageURL)}}>
        <img src={el.webformatURL} alt="" className="ImageGalleryItem-image" />
      </li>)
    )
  }
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.object,
};

export default ImageGalleryItem;
