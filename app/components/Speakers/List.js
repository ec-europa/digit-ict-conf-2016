/**
*
* Speakers/List
*
*/

import React from 'react';
import Speaker from './Speaker';
import styles from './styles.css';

const List = ({ speakers }) => (
  <div className={styles.container}>
    {speakers.map(speaker => <Speaker key={speaker.id} speaker={speaker} />)}
  </div>
);

List.propTypes = {
  speakers: React.PropTypes.array,
};

List.defaultProps = {
  speakers: [],
};

export default List;
