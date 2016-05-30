export default (speakers) => `
  <h1>Speakers</h1>
  <p>Short description</p>
  <ul>
  ${speakers.map(speaker => `
      <li>${speaker.firstname}, ${speaker.lastname}</li>
  `).join('')}
  </ul>
`;
