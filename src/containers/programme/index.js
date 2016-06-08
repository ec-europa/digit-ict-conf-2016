/* global componentHandler */
import h from 'preact/src/h';
import Component from 'preact/src/component';
import { fetchContent } from '../../utils/fetchContent';

import Event from '../../components/events/event';
import MyEvent from '../../components/events/my-event';

import Redux from 'preact-redux';
import { bindActions } from '../../redux/util';
import reduce from '../../redux/reducers';
import * as actions from '../../redux/actions';

@Redux.connect(reduce, bindActions(actions))
export default class Programme extends Component {
	constructor() {
    super();
    fetchContent('data/events.json', (events) => {
      this.state.events = events;
    });
  }

	componentDidMount() {
		componentHandler.upgradeElement(this.base.querySelector('.mdl-tabs'));
  }

	render({ myEvents }, { events }) {
		return (
			<div>
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
								{events.map(event => <Event event={event} />)}
							</ul>
			      </div>
			      <div class="mdl-tabs__panel" id="lannisters-panel">
			        <ul class="demo-list-control mdl-list">
								{myEvents.map(event => <MyEvent event={event} />)}
							</ul>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}
