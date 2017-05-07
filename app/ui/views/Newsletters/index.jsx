/*
 *
 * Newsletters
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// Components
import Newsletter from '../../components/Newsletter/Newsletter';

// Styles
import styles from './Newsletters.scss';

class Newsletters extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.newsletters !== this.props.newsletters ||
      nextProps.status !== this.props.status ||
      nextProps.currentNewsletter !== this.props.currentNewsletter
    );
  }

  render() {
    const { newsletters, currentNewsletter, status } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Newsletter</h1>
        </div>
        <Newsletter newsletter={currentNewsletter} status={status} />
        {newsletters.length > 0 &&
          <div>
            <h2>Archives</h2>
            List of previous newsletters...
            <ul>
              {newsletters.map(() => <li>Newsletter</li>)}
            </ul>
          </div>}
      </div>
    );
  }
}

Newsletters.propTypes = {
  currentNewsletter: PropTypes.shape({
    title: PropTypes.string,
    introduction: PropTypes.string,
    news: PropTypes.array,
  }),
  newsletters: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
};

Newsletters.defaultProps = {
  currentNewsletter: {},
  newsletters: [],
  status: 'loading',
};

export default Newsletters;
