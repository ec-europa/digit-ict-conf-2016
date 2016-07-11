/*
 *
 * Event
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Content
import events from '../../../../../content/events.json';

// Components
import EventModal from './components/Modal';
import Modal from '../../../../components/Modal/Modal';

// Redux actions
import { openModal, closeModal } from '../../../../store/modules/layout';

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
    const { router, onCloseModal } = this.props;
    onCloseModal();
    return router.push('/programme');
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
  router: React.PropTypes.object,
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
  };
}

export default connect(null, mapDispatchToProps)(withRouter(Event));
