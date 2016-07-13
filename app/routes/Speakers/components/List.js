/**
*
* Speakers/List
*
*/

import React from 'react';
import Speaker from '../../../components/Speakers/Speaker';
import styles from './List.scss';

const List = ({ speakers, onOpenModal, location }) => (
  <div className={styles.container}>
    {speakers.map(speaker => <Speaker key={speaker.id} speaker={speaker} openModal={onOpenModal} location={location} />)}
  </div>
);

List.propTypes = {
  speakers: React.PropTypes.array,
  onOpenModal: React.PropTypes.func,
  location: React.PropTypes.object,
};

List.defaultProps = {
  speakers: [],
};

export default List;
