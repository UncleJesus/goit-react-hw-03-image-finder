import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component { 

  componentWillUnmount() {
    window.removeEventListener("click", this.props.onClose);
  };

  render () {

    window.addEventListener('keydown', this.props.onClose);

    return (
      <div onClick={this.props.onClick} className="Overlay">
        <div className="Modal">
          <img src={this.props.target} alt="" />
        </div>
      </div>
    )
  };
};

Modal.propTypes = {
  target: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;
