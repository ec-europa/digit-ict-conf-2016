/**
*
* Expo/List
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Stand from '../../components/Expo/Stand';
import styles from './List.scss';

class List extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { stands } = this.props;
    return (
      <div className={styles.container}>
        {stands.map(stand => <Stand key={stand.id} stand={stand} />)}
      </div>
    );
  }
}

List.propTypes = {
  stands: PropTypes.array,
};

List.defaultProps = {
  stands: [],
};

export default List;
