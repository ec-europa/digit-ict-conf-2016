/*
 *
 * Speakers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

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
  speakers: PropTypes.array,
};

export default Speakers;
