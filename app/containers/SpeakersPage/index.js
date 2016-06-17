/*
 *
 * SpeakersPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { selectAllSpeakers } from '../App/selectors/index';

import SpeakersList from '../../components/Speakers/List';
import './styles.scss';

export class SpeakersPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { speakers } = this.props;
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

SpeakersPage.propTypes = {
  speakers: React.PropTypes.array,
};

SpeakersPage.defaultProps = {
  speakers: [],
};

function mapStateToProps(state) {
  return {
    speakers: selectAllSpeakers(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeakersPage);
