/**
*
* Speakers/List
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Speaker from '../../../ui/components/Speakers/Speaker';
import styles from './List.scss';

class List extends React.PureComponent {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { speakers } = this.props;
    return (
      <div className={styles.container}>
        {speakers.map(speaker => <Speaker key={speaker.id} speaker={speaker} />)}
      </div>
    );
  }
}

List.propTypes = {
  speakers: PropTypes.array,
};

List.defaultProps = {
  speakers: [],
};

export default List;
