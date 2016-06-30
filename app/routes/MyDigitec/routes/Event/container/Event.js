/*
 *
 * Event
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import events from '../../../../../../content/events.json';
import Modal from '../../../../../components/Modal/Modal';
import EventModal from '../component/Modal';
import { openModal, closeModal } from '../../../../../store/modules/layout';

export class Event extends React.Component {
  constructor(props) {
    super(props);

    const { eventId } = props.params;

    this.state = {
      event: events.filter(event => event.id === eventId)[0],
    };

    this.close = this.close.bind(this);
  }

  close() {
    const { changeRoute, onCloseModal } = this.props;
    onCloseModal();
    return changeRoute('/programme');
  }

  render() {
    const { event } = this.state;
    const { onOpenModal } = this.props;

    return (
      <Modal onOpenModal={onOpenModal} onCloseModal={this.close}>
        <EventModal event={event} />
      </Modal>
    );
  }
}

Event.propTypes = {
  params: React.PropTypes.object,
  changeRoute: React.PropTypes.func,
  onOpenModal: React.PropTypes.func,
  onCloseModal: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onOpenModal: () => {
      dispatch(openModal());
    },
    onCloseModal: () => {
      dispatch(closeModal());
    },
    changeRoute: (url) => dispatch(push(url)),
  };
}

export default connect(null, mapDispatchToProps)(Event);
