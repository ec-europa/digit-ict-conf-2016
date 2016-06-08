/* global componentHandler */
import h from 'preact/src/h';
import Component from 'preact/src/component';

import SpeakerModal from '../../../components/speakers/modal';

import Redux from 'preact-redux';
import { bindActions } from '../../../redux/util';
import reduce from '../../../redux/reducers';
import * as actions from '../../../redux/actions';

@Redux.connect(reduce, bindActions(actions))
export default class ModalContainer extends Component {
	componentDidUpdate() {
		if (this.props.showSpeaker) {
			const dialog = this.base;
			dialog.querySelector('.close').addEventListener('click', () => {
	      dialog.close();
	      this.props.closeModal();
	    });
	    dialog.showModal();
		}
  }

	componentDidMount() {
    const dialog = this.base;
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
  }

	render({ showSpeaker }) {
		return (
			<dialog class="mdl-dialog">
				{showSpeaker ? <SpeakerModal speaker={showSpeaker} />: ''}
			</dialog>
		);
	}
}
