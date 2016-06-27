/*
 *
 * Speakers
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import speakers from '../../../../content/speakers.json';
import SpeakersList from '../../../components/Speakers/List';
import styles from './Speakers.scss';
import modalStyles from '../../../components/Modal/Modal.scss';

import { openModal } from '../../../store/modules/layout';

const Speakers = ({ onOpenModal, children, location }) => {
  const content = (
    <ReactCSSTransitionGroup
      transitionName={{
        enter: modalStyles.enter,
        enterActive: modalStyles.enterActive,
        appear: modalStyles.enter,
        appearActive: modalStyles.enterActive,
        leave: modalStyles.leave,
        leaveActive: modalStyles.leaveActive,
      }}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
      transitionAppear
      transitionAppearTimeout={300}
    >
      {children
        ? React.cloneElement(children, { key: location.pathname })
        : ''
      }
    </ReactCSSTransitionGroup>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Speakers</h1>
      </div>
      <SpeakersList speakers={speakers} onOpenModal={onOpenModal} />
      {content}
    </div>
  );
};


Speakers.propTypes = {
  onOpenModal: React.PropTypes.func,
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    modalOpen: state.layout.modalOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onOpenModal: () => {
      dispatch(openModal());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Speakers);
