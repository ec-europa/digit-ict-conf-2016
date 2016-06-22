/*
 *
 * Speakers
 *
 */

import React from 'react';
import speakers from '../../data/speakers.json';
import SpeakersList from '../../components/Speakers/List';
import styles from './Speakers.scss';

export default function Speakers() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Speakers</h1>
      </div>
      <SpeakersList speakers={speakers} />
    </div>
  );
}
