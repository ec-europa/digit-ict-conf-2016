/* global componentHandler */
import h from 'preact/src/h';
import Component from 'preact/src/component';

export default class Event extends Component {
  constructor() {
      super();
      this.toggle = this.toggle.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
		componentHandler.upgradeElement(this.base.querySelector('.mdl-checkbox', 'MaterialIconToggle'));
  }

  // Map action to the container
  toggle() {
    const { onToggle, event } = this.props;
		return onToggle(event);
  }

  render({ event, checked }) {
    return (
      <li class="mdl-list__item mdl-list__item--two-line">
        <span class="mdl-list__item-primary-content">
          <span>{event.title}</span>
          <span class="mdl-list__item-sub-title">
            {event.starts}{event.ends ? ` - ${event.ends}` : ''}{event.venue && event.venue.length ? `, ${event.venue}` : ''}
          </span>
        </span>
        <span class="mdl-list__item-secondary-action">
          <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for={'list-checkbox-' + event.id} onClick={this.toggle}>
            <input type="checkbox" id={'list-checkbox-' + event.id} checked={checked} class="mdl-checkbox__input" />
          </label>
        </span>
      </li>
		);
	}
}
