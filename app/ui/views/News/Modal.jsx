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

    const headerStyle = news.image
      ? {
          background: `url(${__BASENAME__}/static/${news.image}) center 40% no-repeat`,
          backgroundSize: 'cover',
        }
      : {};

    return (
      <Dialog
        id={news.id || 'loading'}
        title={news.title || 'Loading'}
        description={`This modal describes the news: ${news.title}.`}
        onRequestClose={onRequestClose}
      >
        <div className={styles.modalContainer}>
          <div
            className={styles.modalHeader}
            style={headerStyle}
            role="img"
            aria-label={news.title}
          />
          <div className={styles.modalContent}>
            <h3>{news.title}</h3>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: (news.body || []).join('') }}
            />
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
    body: PropTypes.array,
  }),
  onRequestClose: PropTypes.func,
};

Modal.defaultProps = {
  news: {},
  onRequestClose: () => {},
};

export default Modal;
