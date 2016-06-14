import h from 'preact/src/h';
import Component from 'preact/src/component';

import Modal from './modal';

import Redux from 'preact-redux';
import { bindActions } from '../../redux/util';
import reduce from '../../redux/reducers';
import * as actions from '../../redux/actions';

// @Redux.connect(reduce, bindActions(actions))
export default class Speaker extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state.showodal = false;
    this.state.color = ['blue','purple','yellow'][Math.floor(Math.random()*3)];
  }

  handleClick() {
    // this.props.openSpeakerModal(this.props.speaker);
  }

  render({ speaker }, { color }) {
    return (
      <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone speaker_col" onClick={this.handleClick}>
        <div class={'ict-picture-frame ict-picture-frame--' + color}>
          <img class="ict-picture" src={'/assets/images/speakers/' + speaker.picture} alt={speaker.firstname + ' ' + speaker.lastname} />
        </div>
        <div class="speaker_name">
          {speaker.firstname} {speaker.lastname}
        </div>
      </div>
    );
  }
}
