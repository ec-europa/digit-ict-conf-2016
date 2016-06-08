/* global componentHandler */
import h from 'preact/src/h';
import Component from 'preact/src/component';
import { fetchContent } from '../../utils/fetchContent';

import Redux from 'preact-redux';
import { bindActions } from '../../redux/util';
import reduce from '../../redux/reducers';
import * as actions from '../../redux/actions';

@Redux.connect(reduce, bindActions(actions))
export default class Event extends Component {
  constructor() {
      super();
      this.toggle = this.toggle.bind(this);
      this.state.checked = false;
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
		componentHandler.upgradeElement(this.base.querySelector('.mdl-checkbox', 'MaterialIconToggle'));
  }

  toggle() {
    const event = this.props.event;
    const checked = document.getElementById('list-checkbox-'+event.id).checked;

    if (checked) {
      this.props.addEvent(event);
    } else {
      this.props.removeEvent(event);
    }
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
        <span class="mdl-list__item-secondary-action">
          <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for={'list-checkbox-' + event.id} onClick={this.toggle}>
            <input type="checkbox" id={'list-checkbox-' + event.id} checked={checked} class="mdl-checkbox__input" />
          </label>
        </span>
      </li>
		);
	}
}
