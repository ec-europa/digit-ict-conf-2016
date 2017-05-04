/**
*
* Events/Modal
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// Components
import Dialog from '../../components/Modal/Dialog';

// Styles
import styles from './Modal.scss';

class Modal extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.news !== this.props.news;
  }

  render() {
    const { news, onRequestClose } = this.props;

    return (
      <Dialog
        id={news.id || 'loading'}
        title={news.title || 'Loading'}
        description={`This modal describes the news: ${news.title}.`}
        onRequestClose={onRequestClose}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <h1>{news.title}</h1>
          </div>
          <div className={styles.modalContent}>
            <p>{news.body}</p>
          </div>
        </div>
      </Dialog>
    );
  }
}

Modal.propTypes = {
  news: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
  onRequestClose: PropTypes.func,
};

Modal.defaultProps = {
  news: {},
  onRequestClose: () => {},
};

export default Modal;
