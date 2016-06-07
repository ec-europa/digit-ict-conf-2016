import h from 'preact/src/h';
import Component from 'preact/src/component';

import Modal from './modal';

export default class Speaker extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state.showModal = false;
    this.state.color = ['blue','purple','yellow'][Math.floor(Math.random()*3)];
  }

  handleClick() {
    this.setState((previousState) => {
       return { showModal: !previousState.showModal }
    });
  }

  render({ speaker }, { showModal, color }) {
    return (
      <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone speaker_col" onClick={this.handleClick}>
        <div class={'ict-picture-frame ict-picture-frame--' + color}>
          <img class="ict-picture" src={'/assets/images/speakers/' + speaker.picture} alt={speaker.firstname + ' ' + speaker.lastname} />
        </div>
        <div class="speaker_name">
          {speaker.firstname} {speaker.lastname}
        </div>
        {showModal ? <Modal speaker="speaker" /> : ''}
      </div>
    );
  }
}
