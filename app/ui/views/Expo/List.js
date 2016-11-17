/**
*
* Expo/List
*
*/

import React from 'react';
import Stand from '../../components/Expo/Stand';
import styles from './List.scss';

class List extends React.PureComponent {
  render() {
    const { stands, location } = this.props;
    return (
      <div className={styles.container}>
        {stands.map(stand => <Stand key={stand.id} stand={stand} location={location} />)}
      </div>
    );
  }
}

List.propTypes = {
  stands: React.PropTypes.array,
  location: React.PropTypes.object,
};

List.defaultProps = {
  stands: [],
};

export default List;
