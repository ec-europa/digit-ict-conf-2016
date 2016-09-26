/*
 *
 * Stands
 *
 */

import React from 'react';

// Components
import StandsList from './List';

// Styles
import styles from './Stands.scss';

class Stands extends React.PureComponent {
  render() {
    const { stands, location } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Stands</h1>
        </div>
        <StandsList stands={stands} location={location} />
      </div>
    );
  }
}

Stands.propTypes = {
  location: React.PropTypes.object,
  stands: React.PropTypes.array,
};

export default Stands;
