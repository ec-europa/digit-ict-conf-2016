/**
*
* Speakers/Page
*
*/

import React from 'react';

// Styles
import styles from './Page.scss';

// Components
import EventRow from '../../components/Events/Row';
import Link from '../../components/Link/Link';

// Images
import twitterLogo from './images/twitter.png';

class Page extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return nextProps.schedule !== this.props.schedule;
  }

  render() {
    const { speaker, speakerEvents, schedule, onToggleEvent, location } = this.props;
    const sessions = speakerEvents.length ? (
      <div>
        <h3>Session{speakerEvents.length > 1 ? 's' : ''}</h3>
        {speakerEvents.map(event => <EventRow key={event.id} event={event} checked={schedule[event.id]} onToggle={onToggleEvent} location={location} />)}
      </div>
    ) : '';

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src={speaker.picture}
            alt={`${speaker.firstname} ${speaker.lastname}`}
            className={styles.headerPicture}
          />
          <div className={styles.headerTitles}>
            <h3>{speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span></h3>
            <h4 className={styles.title}>{speaker.title}</h4>
          </div>
        </div>
        <div className={styles.bio}>
          {speaker.bio.map((line, index) => (<p key={index}>{line}</p>))}
        </div>
        {speaker.twitter
         ? <Link className={styles.twitter} to={`https://twitter.com/${speaker.twitter.substr(1)}`} target="_blank" rel="noopener noreferrer"><img src={twitterLogo} alt="Twitter Feed" /> {speaker.twitter}</Link>
         : null
        }
        {sessions}
      </div>
    );
  }
}

Page.propTypes = {
  speaker: React.PropTypes.object,
  speakerEvents: React.PropTypes.array,
  schedule: React.PropTypes.object,
  onToggleEvent: React.PropTypes.func,
  location: React.PropTypes.object,
};

Page.defaultProps = {
  speaker: {},
  schedule: [],
};

export default Page;
