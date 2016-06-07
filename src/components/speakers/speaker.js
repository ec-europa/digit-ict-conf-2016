import h from 'preact/src/h';
import Component from 'preact/src/component';

export default class Speaker extends Component {
  render({ speaker }) {
    return (
      <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone speaker_col">
        <div class={'ict-picture-frame ict-picture-frame--' + ['blue','purple','yellow'][Math.floor(Math.random()*3)]}>
          <img class="ict-picture" src={'/assets/images/speakers/' + speaker.picture} alt={speaker.firstname + ' ' + speaker.lastname} />
        </div>
        <div class="speaker_name">
          {speaker.firstname} {speaker.lastname}
        </div>
      </div>
    );
  }
}
