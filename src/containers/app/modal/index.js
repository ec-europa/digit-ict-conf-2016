/* global componentHandler */
import h from 'preact/src/h';
import Component from 'preact/src/component';

import SpeakerModal from '../../../components/speakers/modal';

import Redux from 'preact-redux';
import { bindActions } from '../../../redux/util';
import * as actions from '../../../redux/actions';

@Redux.connect((state) => { modal: state.modal }, bindActions(actions))
export default class ModalContainer extends Component {
	componentDidUpdate() {
		if (this.props.modal.open) {
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

	render({ modal }) {
		return (
			<dialog class="mdl-dialog">
				{modal.open ? <SpeakerModal speaker={modal.data} />: ''}
			</dialog>
		);
	}
}
