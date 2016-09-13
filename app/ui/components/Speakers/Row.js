/**
*
* Events/Row
*
*/

import React from 'react';
import Link from '../Link/Link';
import styles from './Row.scss';

class Row extends React.PureComponent {
  render() {
    const { speaker } = this.props;
    return (
      <Link
        className={styles.speakerContainer}
        to={{
          pathname: `/speaker/${speaker.id}`,
          state: { modal: true },
        }}
      >
        <div className={styles.speakerPicture}>
          <img src={speaker.picture} alt={`${speaker.firstname} ${speaker.lastname}`} />
        </div>
        <div className={styles.speakerInfo}>
          <h3>{speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span></h3>
          <h4 className={styles.title}>{speaker.title}</h4>
        </div>
      </Link>
    );
  }
}

Row.propTypes = {
  speaker: React.PropTypes.object,
};

Row.defaultProps = {
  speaker: {},
};

export default Row;