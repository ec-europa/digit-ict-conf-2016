/* global componentHandler */
import h from 'preact/src/h';
import Component from 'preact/src/component';

export default class MyEvent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render({ event }, { checked }) {
    return (
      <li class="mdl-list__item mdl-list__item--two-line">
        <span class="mdl-list__item-primary-content">
          <span>{event.title}</span>
          <span class="mdl-list__item-sub-title">
            {event.starts}{event.ends ? ` - ${event.ends}` : ''}{event.venue && event.venue.length ? `, ${event.venue}` : ''}
          </span>
        </span>
      </li>
		);
	}
}
