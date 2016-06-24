/**
*
* Speakers/Speaker
*
*/

import React from 'react';
import { connect } from 'react-redux';
import Modal from './Modal';
import { selectEventsBySpeaker } from '../../store/modules/events';
import styles from './styles.scss';

export class Speaker extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { speaker, sessions, openModal } = this.props;
    const content = (<Modal speaker={speaker} events={sessions} />);

    return openModal(content);
  }

  render() {
    const speaker = this.props.speaker;

    return (
      <div className={styles.item} onClick={this.handleClick}>
        <div className={styles.pictureFrame}>
          <img className={styles.picture} src={`./assets/images/speakers/${speaker.picture}`} alt={`${speaker.firstname} ${speaker.lastname}`} />
        </div>
        <div className={styles.name}>
          {speaker.firstname} <span className={styles.lastname}>{speaker.lastname}</span>
        </div>
        <div className={styles.title}>{speaker.title}</div>
      </div>
    );
  }
}

Speaker.propTypes = {
  speaker: React.PropTypes.object,
  openModal: React.PropTypes.func,
  sessions: React.PropTypes.array,
};

Speaker.defaultProps = {
  speaker: {},
  sessions: [],
};

function mapStateToProps(state, props) {
  return {
    sessions: selectEventsBySpeaker(state)(props.speaker),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Speaker);
