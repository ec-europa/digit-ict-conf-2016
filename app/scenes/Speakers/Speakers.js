/*
 *
 * Speakers
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import speakers from '../../data/speakers.json';
import SpeakersList from '../../components/Speakers/List';
import styles from './Speakers.scss';

import { openModal } from '../../store/modules/layout';

const Speakers = ({ onOpenModal }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <h1>Speakers</h1>
    </div>
    <SpeakersList speakers={speakers} onOpenModal={onOpenModal} />
  </div>
);

Speakers.propTypes = {
  onOpenModal: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    modalOpen: state.layout.modalOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onOpenModal: (content) => {
      dispatch(openModal(content));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Speakers);
