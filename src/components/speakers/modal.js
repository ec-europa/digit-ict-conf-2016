import h from 'preact/src/h';
import Component from 'preact/src/component';

export default class Modal extends Component {
  componentDidMount() {
    const dialog = this.base;
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
    dialog.showModal();
  }

  render({ speaker }) {
    return (
      <dialog class="mdl-dialog">
        <div class="mdl-dialog__content">
          <div class={'ict-picture-frame ict-picture-frame--' + ['blue','purple','yellow'][Math.floor(Math.random()*3)]}>
            <img class="ict-picture" src={'/assets/images/speakers/' + speaker.picture} alt={speaker.firstname + ' ' + speaker.lastname} />
          </div>
          <div class="speaker_name">
            {speaker.firstname} {speaker.lastname}
          </div>
        </div>
        <div class="mdl-dialog__actions mdl-dialog__actions--full-width">
          <button type="button" class="mdl-button">Agree</button>
          <button type="button" class="mdl-button close">Disagree</button>
        </div>
      </dialog>
    );
  }
}
