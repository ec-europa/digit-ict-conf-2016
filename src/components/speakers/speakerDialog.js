export default function speakerComponent(speaker) {
  return {
    render: () => `
    <h4 class="mdl-dialog__title">${speaker.firstname} ${speaker.lastname}</h4>
    <div class="mdl-dialog__content">
      <p>
        ${speaker.bio.join('<br/>')}
      </p>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button close">Close</button>
    </div>
    `,
    bindEvents: () => {},
  };
}
