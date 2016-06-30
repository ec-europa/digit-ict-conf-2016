/*
 *
 * Speaker
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import speakers from '../../../../../../content/speakers.json';
import Modal from '../../../../../components/Modal/Modal';
import SpeakerModal from '../component/Modal';
import { openModal, closeModal } from '../../../../../store/modules/layout';

export class Speaker extends React.Component {
  constructor(props) {
    super(props);

    const { speakerId } = props.params;

    this.state = {
      speaker: speakers.filter(speaker => speaker.id === speakerId)[0],
    };

    this.close = this.close.bind(this);
  }

  close() {
    const { changeRoute, onCloseModal } = this.props;
    onCloseModal();
    return changeRoute('/speakers');
  }

  render() {
    const { speaker } = this.state;
    const { onOpenModal } = this.props;

    return (
      <Modal onOpenModal={onOpenModal} onCloseModal={this.close}>
        <Helmet title={`${speaker.firstname} ${speaker.lastname}`} />
        <SpeakerModal speaker={speaker} />
      </Modal>
    );
  }
}

Speaker.propTypes = {
  params: React.PropTypes.object,
  changeRoute: React.PropTypes.func,
  onOpenModal: React.PropTypes.func,
  onCloseModal: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onOpenModal: (content) => {
      dispatch(openModal(content));
    },
    onCloseModal: () => {
      dispatch(closeModal());
    },
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(Speaker);
