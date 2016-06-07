import h from 'preact/src/h';
import Component from 'preact/src/component';
import { fetchContent } from '../../utils/fetchContent';

import Speaker from '../../components/speakers/speaker';

export default class Speakers extends Component {
  constructor() {
    super();
    fetchContent('data/speakers.json', (speakers) => {
      this.state.speakers = speakers;
    });
  }

  render(props, { speakers }) {
    return (
      <div>
        <div class="mdl-grid ict-max-width-900">
          <div class="mdl-cell mdl-cell--12-col">
            <h1>Speakers</h1>
          </div>
        </div>
        <div class="mdl-grid ict-max-width-900">
          {speakers.map(speaker => <Speaker speaker={speaker} />)}
        </div>
      </div>
    );
  }
}
