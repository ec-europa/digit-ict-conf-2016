/*
 *
 * Speakers
 *
 */

import React from 'react';

// Components
import SpeakersList from './List';

// Styles
import styles from './Speakers.scss';

class Speakers extends React.PureComponent {
  render() {
    const { speakers, location } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Speakers</h1>
        </div>
        <SpeakersList speakers={speakers} location={location} />
      </div>
    );
  }
}

Speakers.propTypes = {
  location: React.PropTypes.object,
  speakers: React.PropTypes.array,
};

export default Speakers;
