/*
 *
 * SpeakersPage
 *
 */

import React from 'react';
import speakers from '../../data/speakers.json';
import SpeakersList from '../../components/Speakers/List';
import './styles.scss';

export class SpeakersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <div className="speakersPageHeader">
          <h1>Speakers</h1>
        </div>
        <SpeakersList speakers={speakers} />
      </div>
    );
  }
}


export default SpeakersPage;
