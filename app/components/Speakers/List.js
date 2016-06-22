/**
*
* Speakers/List
*
*/

import React from 'react';
import Speaker from './Speaker';
import styles from './styles.scss';

const List = ({ speakers, onOpenModal }) => (
  <div className={styles.container}>
    {speakers.map(speaker => <Speaker key={speaker.id} speaker={speaker} openModal={onOpenModal} />)}
  </div>
);

List.propTypes = {
  speakers: React.PropTypes.array,
  onOpenModal: React.PropTypes.func,
};

List.defaultProps = {
  speakers: [],
};

export default List;
