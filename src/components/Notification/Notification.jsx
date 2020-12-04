import React from 'react';
import styles from '../Notification/Notification.module.css';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  return <h2 className={styles.notification}>{message}</h2>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

Notification.defaultProps = {
  message: 'Oops, something went wrong!',
};

export default Notification;
