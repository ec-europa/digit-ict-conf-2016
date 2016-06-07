/* global componentHandler */
import h from 'preact/src/h';
import Component from 'preact/src/component';
import { fetchContent } from '../../utils/fetchContent';

export default class Event extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render({ event }) {
    return (
      <li class="mdl-list__item mdl-list__item--two-line">
        <span class="mdl-list__item-primary-content">
          <span>{event.title}</span>
          <span class="mdl-list__item-sub-title">
            {event.starts}{event.ends ? ` - ${event.ends}` : ''}{event.venue && event.venue.length ? `, ${event.venue}` : ''}
          </span>
        </span>
        <span class="mdl-list__item-secondary-action">
          <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for={'list-checkbox-' + event.id}>
            <input type="checkbox" id={'list-checkbox-' + event.id} class="mdl-checkbox__input" />
          </label>
        </span>
      </li>
		);
	}
}
