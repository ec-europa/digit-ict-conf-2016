/*
 *
 * Speaker
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

// Content
import speakers from '../../../../../content/speakers.json';

// Components
import Modal from '../../../../components/Modal/Modal';
import SpeakerModal from './components/Modal';

// Redux actions
import { openModal, closeModal } from '../../../../store/modules/layout';

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
    const { router, onCloseModal } = this.props;
    onCloseModal();
    return router.push('/speakers');
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
  router: React.PropTypes.object,
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
  };
}

export default connect(null, mapDispatchToProps)(withRouter(Speaker));
