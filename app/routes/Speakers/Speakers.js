/*
 *
 * Speakers
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Content
import speakers from '../../../content/speakers.json';

// Components
import SpeakersList from './components/List';

// Styles
import styles from './Speakers.scss';

// Redux actions
import { openModal, updateHeaderTitle } from '../../store/modules/layout';

class Speakers extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Speakers');
  }

  render() {
    const { onOpenModal, location } = this.props;
    return (
      <div className={styles.container}>
        <Helmet title="Speakers" />
        <div className={styles.header}>
          <h1>Speakers</h1>
        </div>
        <SpeakersList speakers={speakers} onOpenModal={onOpenModal} location={location} />
      </div>
    );
  }
}

Speakers.propTypes = {
  onOpenModal: React.PropTypes.func,
  onUpdateHeaderTitle: React.PropTypes.func,
  location: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    onOpenModal: () => {
      dispatch(openModal());
    },
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(Speakers);
