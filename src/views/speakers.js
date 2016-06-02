export default (speakers) => `
  <div class="mdl-grid ict-max-width-900">
    <div class="mdl-cell mdl-cell--12-col">
      <h1>Speakers</h1>
      <p>Small description</p>
    </div>
  </div>
  <div class="mdl-grid ict-max-width-900">
    ${speakers.map(speaker => `
      <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--2-col-phone speaker_col">
          <img class="speaker_thumbnail speaker_thumbnail--${['blue','purple','yellow'][Math.floor(Math.random()*3)]}"
            src="/assets/images/speakers/${speaker.picture}"
            alt="${speaker.firstname} ${speaker.lastname}" />
          <div class="speaker_name">
            ${speaker.firstname} ${speaker.lastname}
          </div>
        </div>
    `).join('')}
  </div>
`;
