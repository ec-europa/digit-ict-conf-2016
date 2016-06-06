import speakerComponent from './speaker';

export default function speakersListComponent(speakers) {
  const subcomponents = [];

  speakers.forEach(speaker => {
    const subcomponent = speakerComponent(speaker);
    subcomponents.push(subcomponent);
  });

  return {
    render: () => `
      <div class="mdl-grid ict-max-width-900">
        <div class="mdl-cell mdl-cell--12-col">
          <h1>Speakers</h1>
        </div>
      </div>
      <div class="mdl-grid ict-max-width-900">
        ${subcomponents.map(subcomponent => subcomponent.render()).join('')}
      </div>
    `,
    bindEvents: () => {
      subcomponents.forEach(subcomponent => {
        subcomponent.bindEvents();
      });
    },
  };
}
