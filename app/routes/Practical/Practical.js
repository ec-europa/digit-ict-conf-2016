/**
 * Practical
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// 3rd party dependencies
import $script from 'scriptjs';

// Load Redux actions
import { updateHeaderTitle } from '../../store/modules/layout';

// Load styles
import styles from './Practical.scss';

// Images
import androidBrowserImg from './images/menu.jpg';
import androidHomescreenImg from './images/homescreen.jpg';

export class Practical extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Practical');

    const webtoolsMapData = document.createElement('script');
    webtoolsMapData.setAttribute('type', 'application/json');
    webtoolsMapData.innerHTML = `
      {
        "service": "map",
        "map": {
          "zoom": "16",
          "center": [
            "50.8437",
            "4.35858"
          ]
        },
        "layers": [
          {
            "markers": [
              "${window.location.origin}${__BASENAME__}/assets/map.geojson"
            ]
          }
        ]
      }
    `;
    this.refs.map.appendChild(webtoolsMapData);

    $script('//europa.eu/webtools/load.js', () => {
      // Refresh the map if needed
      if (window.L) {
        window.$wt.refresh();
      }
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.container}>
        <Helmet title="Practical" />
        <div className={styles.header}>
          <h1>Practical</h1>
        </div>
        <h2>How to get to SQUARE Brussels?</h2>
        <div>
          SQUARE- Brussels Meeting Centre<br />
          Rue Mont des Arts<br />
          B-1000 Brussels, Belgium
        </div>
        <div>
          <a href="http://www.squarebrussels.com/sfSympalBossSiteModel1Plugin/pdf/SQUARE_how_to_get_there.pdf">
            Directions (PDF)
          </a>
        </div>
        <div id="map" ref="map" />
        <h2>Did you know?</h2>
        <p>On iOS or with Chrome for Android, you can add DIGITEC to your home screen!</p>
        <h3>How To</h3>
        <p>
          With Chrome for Android, go to the website, open Chrome's menu and click on the "Add to home screen" link.
          You will be asked to give a name to the app and then, a new icon will be created on your home screen!
        </p>
        <div className={styles.illustrations}>
          <img src={androidBrowserImg} alt="Chrome Menu" />
          <img src={androidHomescreenImg} alt="Android Home screen" />
        </div>
      </div>
    );
  }
}

Practical.propTypes = {
  onUpdateHeaderTitle: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(Practical);
