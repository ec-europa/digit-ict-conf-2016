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
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { speakers } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Speakers</h1>
        </div>
        <SpeakersList speakers={speakers} />
      </div>
    );
  }
}

Speakers.propTypes = {
  speakers: React.PropTypes.array,
};

export default Speakers;
