import h from 'preact/src/h';
import Component from 'preact/src/component';

export default class Home extends Component {
	render() {
		return (
			<div>
				<div class="ict-home-cfa mdl-typography--text-center">
			    <h1>DIGITEC 2016: Digital Future</h1>
			    <h2>29/11/2016 BRUSSELS</h2>
			    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent ict-home-register">
			      Register
			    </button>
			    <div class="ict-home-expand">
			      <a href="#about"><i class="material-icons">expand_more</i></a>
			    </div>
			  </div>
			  <div class="mdl-grid ict-max-width-900" id="about">
			    <div class="mdl-cell mdl-cell--6-col">
			      <h3>Joint conference European Commission and the European Parliament</h3>
			      <p>
			        <strong>DIGITEC 2016: Digital Future</strong> will take place on <strong>November 29<sup>th</sup></strong>
			        in Brussels. The 9th edition of the event will bring together the IT communities of the European
			        institutions for interactive discussions on how to use digital technologies to do policy better and
			        how the digital future will shape the way of working in the large organisations.
			      </p>
			    </div>
			    <div class="mdl-cell mdl-cell--6-col">
			      <h3>Speakers</h3>
			      <div class="mdl-grid">
			        <div class="mdl-cell mdl-cell--4-col">
			        <div class="ict-picture-frame ict-picture-frame--blue">
			            <img src="assets/images/speakers/davidborrelli.png" class="ict-picture"/>
			        </div>
			        </div>
			        <div class="mdl-cell mdl-cell--4-col">
			          <div class="ict-picture-frame ict-picture-frame--blue">
			              <img src="assets/images/speakers/davidborrelli.png" class="ict-picture"/>
			          </div>
			        </div>
			        <div class="mdl-cell mdl-cell--4-col">
			          <div class="ict-picture-frame ict-picture-frame--blue">
			              <img src="assets/images/speakers/davidborrelli.png" class="ict-picture"/>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}
