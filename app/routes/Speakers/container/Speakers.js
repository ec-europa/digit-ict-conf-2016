/*
 *
 * Speakers
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Helmet from 'react-helmet';

import speakers from '../../../../content/speakers.json';
import SpeakersList from '../../../components/Speakers/List';
import styles from './Speakers.scss';
import modalStyles from '../../../components/Modal/Modal.scss';

import { openModal, updateHeaderTitle } from '../../../store/modules/layout';

class Speakers extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Speakers');
  }

  render() {
    const { onOpenModal, children, location } = this.props;
    return (
      <div className={styles.container}>
        <Helmet title="Speakers" />
        <div className={styles.header}>
          <h1>Speakers</h1>
        </div>
        <SpeakersList speakers={speakers} onOpenModal={onOpenModal} />
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
          {children ? React.cloneElement(children, { key: location.pathname }) : null}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Speakers.propTypes = {
  onOpenModal: React.PropTypes.func,
  onUpdateHeaderTitle: React.PropTypes.func,
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
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Speakers);
