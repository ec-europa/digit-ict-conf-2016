/**
*
* Speakers/Modal
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// Styles
import styles from './Modal.scss';

// Components
import Dialog from '../../components/Modal/Dialog';

class Modal extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { stand, onRequestClose } = this.props;

    const headerStyle = {
      background: `url(${stand.visual}) center 40% no-repeat`,
      backgroundSize: 'cover',
    };

    return (
      <Dialog
        id={stand.id}
        title={stand.title}
        description={`This modal introduces ${stand.title}.`}
        onRequestClose={onRequestClose}
      >
        <div className={styles.modalContainer}>
          <div
            className={styles.modalHeader}
            style={headerStyle}
            role="img"
            aria-label={stand.title}
          />
          <div className={styles.modalContent}>
            <div className={styles.number}>{stand.number}</div>
            <h3>{stand.title}</h3>
            <h4 className={styles.title}>{stand.subtitle}</h4>
            <div className={styles.description}>
              {stand.description.map((line, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
              ))}
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

Modal.propTypes = {
  stand: PropTypes.object,
  onRequestClose: PropTypes.func,
};

Modal.defaultProps = {
  stand: {},
  schedule: [],
};

export default Modal;
