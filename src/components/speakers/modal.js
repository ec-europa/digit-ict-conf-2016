import h from 'preact/src/h';
import Component from 'preact/src/component';

export default class Modal extends Component {
  render({ speaker }) {
    return (
      <div>
        <div class="mdl-dialog__content">
          <div class={'ict-picture-frame ict-picture-frame--' + ['blue','purple','yellow'][Math.floor(Math.random()*3)]}>
            <img class="ict-picture" src={'/assets/images/speakers/' + speaker.picture} alt={speaker.firstname + ' ' + speaker.lastname} />
          </div>
          <div class="speaker_name">
            {speaker.firstname} {speaker.lastname}
          </div>
          <div class="speaker_bio" dangerouslySetInnerHTML={{__html: speaker.bio.join('<br/>') }} />
        </div>
        <div class="mdl-dialog__actions mdl-dialog__actions--full-width">
          <button type="button" class="mdl-button close">Close</button>
        </div>
      </div>
    );
  }
}
