/**
*
* Speakers/Page
*
*/

import React from 'react';

// Components
import SpeakerRow from '../Speakers/Row';

// Styles
import styles from './Modal.scss';

// Content
import speakers from '../../../content/speakers.json';

const Page = ({ event, location }) => {
  const startsAt = (
    <time>{event.starts}</time>
  );
  const endsAt = event.ends ? (
    <time>{event.ends}</time>
  ) : null;

  let venue = null;
  if (event.venue && event.venue.length > 0) {
    venue = `, ${event.venue}`;
  }

  const eventModerator = speakers.filter(speaker => event.moderator === speaker.id);
  const eventSpeakers = speakers.filter(speaker => event.speakers.indexOf(speaker.id) > -1);
  const moderatorBlock = eventModerator.length ? (
    <div>
      <h2>Moderator</h2>
      {eventModerator.map(speaker => (
        <SpeakerRow key={speaker.id} speaker={speaker} location={location} />
      ))}
    </div>
  ) : null;

  const speakersBlock = eventSpeakers.length ? (
    <div>
      <h2>Speaker{eventSpeakers.length > 1 ? 's' : ''}</h2>
      {eventSpeakers.map(speaker => (
        <SpeakerRow key={speaker.id} speaker={speaker} location={location} />
      ))}
    </div>
  ) : null;

  return (
    <div className={styles.pageContainer}>
      <h1>{event.title}</h1>
      <h2>{startsAt}{event.ends ? ' - ' : ''}{endsAt}{venue}</h2>
      <div className={styles.name}>
        {event.description.map((line, index) => (<p key={index}>{line}</p>))}
      </div>
      {moderatorBlock}
      {speakersBlock}
    </div>
  );
};


Page.propTypes = {
  event: React.PropTypes.object,
  location: React.PropTypes.object,
};

Page.defaultProps = {
  event: {},
};


export default Page;
