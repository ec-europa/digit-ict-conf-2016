/**
*
* Expo/Stand
*
*/

import React from 'react';
import { Link } from 'react-router';

import styles from './Stand.scss';

class Stand extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { stand } = this.props;
    return (
      <Link
        className={styles.item}
        to={{
          pathname: `/stand/${stand.id}`,
          state: { modal: true },
        }}
      >
        <div className={styles.pictureFrame}>
          <img className={styles.picture} src={stand.visual} alt={stand.title} />
        </div>
        <div className={styles.info}>
          <div className={styles.number}>{stand.number}</div>
          <div className={styles.name}>
            {stand.title}
          </div>
          <div className={styles.title}>{stand.subtitle}</div>
        </div>
      </Link>
    );
  }
}

Stand.propTypes = {
  stand: React.PropTypes.object,
};

Stand.defaultProps = {
  stand: {},
};

export default Stand;
