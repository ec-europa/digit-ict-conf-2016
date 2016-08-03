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
import { updateHeaderTitle } from '../../store/modules/ui/header';

class Speakers extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Speakers');
  }

  render() {
    const { location } = this.props;
    return (
      <div className={styles.container}>
        <Helmet title="Speakers" />
        <div className={styles.header}>
          <h1>Speakers</h1>
        </div>
        <SpeakersList speakers={speakers} location={location} />
      </div>
    );
  }
}

Speakers.propTypes = {
  onUpdateHeaderTitle: React.PropTypes.func,
  location: React.PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(Speakers);
