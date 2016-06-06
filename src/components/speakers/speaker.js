import speakerDialogComponent from './speakerDialog';
import render from '../../utils/render';

export default function speakerComponent(speaker) {
  const onClick = () => {
    const dialogComponent = speakerDialogComponent(speaker);
    const dialog = window.document.querySelector('dialog');
    const content = dialogComponent.render();
    render(dialog, content);
    dialog.querySelector('.close').addEventListener('click', () => {
      dialog.close();
    });
    dialogComponent.bindEvents();
    dialog.showModal();
  };

  return {
    render: () => `
      <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone speaker_col" id="speaker-${speaker.id}">
        <div class="ict-picture-frame ict-picture-frame--${['blue', 'purple', 'yellow'][Math.floor(Math.random() * 3)]}">
          <img class="ict-picture"
            src="/assets/images/speakers/${speaker.picture}"
            alt="${speaker.firstname} ${speaker.lastname}" />
        </div>
        <div class="speaker_name">
          ${speaker.firstname} ${speaker.lastname}
        </div>
      </div>
    `,
    bindEvents: () => {
      const element = window.document.getElementById(`speaker-${speaker.id}`);
      element.addEventListener('click', onClick);
    },
  };
}
