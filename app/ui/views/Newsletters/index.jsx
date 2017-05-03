/*
 *
 * Newsletters
 *
 */

import React from 'react';

// Components
import Newsletter from '../../components/Newsletter/Newsletter';

// Styles
import styles from './Newsletters.scss';

class Newsletters extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.newsletters !== this.props.newsletters ||
      nextProps.currentNewsletter !== this.props.currentNewsletter
    );
  }

  render() {
    const { newsletters, currentNewsletter } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Newsletter</h1>
        </div>
        <Newsletter newsletter={currentNewsletter} />
        <div>
          <h2>Archives</h2>
          List of previous newsletters...
        </div>
      </div>
    );
  }
}

Newsletters.propTypes = {
  newsletters: React.PropTypes.array,
};

Newsletters.defaultProps = {
  newsletters: [],
};

export default Newsletters;
