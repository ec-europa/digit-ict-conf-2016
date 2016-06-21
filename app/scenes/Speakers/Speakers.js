/*
 *
 * Speakers
 *
 */

import React from 'react';
import speakers from '../../data/speakers.json';
import SpeakersList from '../../components/Speakers/List';
import './styles.scss';

export default function Speakers() {
  return (
    <div>
      <div className="speakersPageHeader">
        <h1>Speakers</h1>
      </div>
      <SpeakersList speakers={speakers} />
    </div>
  );
}
