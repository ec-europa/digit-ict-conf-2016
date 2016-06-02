export default (events) => `
  <div class="mdl-grid ict-max-width-900">
    <div class="mdl-cell mdl-cell--12-col">
      <h1>Programme</h1>
    </div>
  </div>
  <div class="mdl-grid ict-max-width-900">
    <div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
      <div class="mdl-tabs__tab-bar">
          <a href="#starks-panel" class="mdl-tabs__tab is-active">Agenda</a>
          <a href="#lannisters-panel" class="mdl-tabs__tab">My schedule</a>
      </div>
      <div class="mdl-tabs__panel is-active" id="starks-panel">
        <ul class="demo-list-control mdl-list">
          ${events.map(event => `
              <li class="mdl-list__item mdl-list__item--two-line">
                <span class="mdl-list__item-primary-content">
                  <span>${event.title}</span>
                  <span class="mdl-list__item-sub-title">
                    ${event.starts}${event.ends ? ` - ${event.ends}` : ''}${event.venue && event.venue.length ? `, ${event.venue}` : ''}
                  </span>
                </span>
                <span class="mdl-list__item-secondary-action">
                  <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-${event.id}">
                    <input type="checkbox" id="list-checkbox-${event.id}" class="mdl-checkbox__input" />
                  </label>
                </span>
              </li>
          `).join('')}
        </ul>
      </div>
      <div class="mdl-tabs__panel" id="lannisters-panel">
        <ul>
          <li>Nothing to show</li>
        </ul>
      </div>
    </div>
  </div>
`;
