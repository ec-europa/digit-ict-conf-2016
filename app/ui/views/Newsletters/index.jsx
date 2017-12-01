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
      nextProps.status !== this.props.status
    );
  }

  render() {
    const { newsletters, status } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Newsletters</h1>
          <ul>
            {newsletters.map(newsletter =>
              <li key={newsletter.id}>
                <a href={`#${newsletter.id}`}>{newsletter.title}</a>
              </li>
            )}
          </ul>
        </div>
        {newsletters.map(newsletter =>
          <Newsletter newsletter={newsletter} status={status} key={newsletter.id} />
        )}
      </div>
    );
  }
}

Newsletters.propTypes = {
  newsletters: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string,
};

Newsletters.defaultProps = {
  newsletters: [],
  status: 'loading',
};

export default Newsletters;
