/**
 * Practical
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// 3rd party dependencies
import $script from 'scriptjs';

// Load Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Load styles
import styles from './Practical.scss';

// Images
import androidBrowserImg from './images/android-browser.jpg';
import androidHomescreenImg from './images/android-homescreen.jpg';
import iosBrowserImg from './images/ios-browser.jpg';
import iosAddtohomescreenImg from './images/ios-addtohomescreen.jpg';
import iosHomescreenImg from './images/ios-homescreen.jpg';

class Practical extends React.Component {
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
            "markers": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "properties": {
                  "name": "SQUARE",
                  "description": "<p>SQUARE - Brussels Meeting Centre<br\/>Rue Mont des Arts<br\/>B-1000 Brussels, Belgium<\/p>"
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [4.357591867446899, 50.84392160693993]
                }
              }]
            },
            "options": {
              "color": "turquoise"
            }
          },
          {
            "markers": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "properties": {
                  "name": "Parking",
                  "description": "<p>Parking Albertine-Square<br\/>Place de la Justice 16<br\/>B-1000 Brussels, Belgium<\/p>"
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [4.354912, 50.843541]
                }
              }, {
                "type": "Feature",
                "properties": {
                  "name": "Parking",
                  "description": "<p>Parking Albertine-Square<br\/>Rue des Sols - Stuiversstraat<br\/>B-1000 Brussels, Belgium<\/p>"
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [4.357360, 50.844744]
                }
              }]
            },
            "options": {
              "color": "yellow"
            }
          }
        ]
      }
    `;
    this.map.appendChild(webtoolsMapData);

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
        <h2>Registration</h2>
        <p>The event is open to EU institutions' staff only. The registration is available <a href="https://scic.ec.europa.eu/fmi/ezreg/DIGITEC2016/start" target="_blank" rel="noopener noreferrer">here</a>.</p>
        <h2>How to get to SQUARE Brussels?</h2>
        <div>
          SQUARE - Brussels Meeting Centre<br />
          Rue Mont des Arts<br />
          B-1000 Brussels, Belgium
        </div>
        <div className={styles.spaced}>
          <a href="http://www.squarebrussels.com/sfSympalBossSiteModel1Plugin/pdf/SQUARE_how_to_get_there.pdf">
            Directions (PDF)
          </a>
        </div>
        <div id="map" ref={(c) => { this.map = c; }} />
        <h2>DIGITEC live</h2>
        <p>Follow DIGITEC on Twitter (<a href="https://twitter.com/hashtag/digitec16" target="_blank" rel="noopener noreferrer">#digitec16</a>) or via the webstream on 29<sup>th</sup> of November.</p>
        <h2>DIGITEC on your mobile</h2>
        <p>On iOS or with Chrome for Android, you can add DIGITEC to your home screen.</p>
        <h3>Android</h3>
        <p>
          With Chrome for Android, go to the website, open Chrome's menu and click on the "Add to home screen" link.
          You will be asked to give a name to the app and then, a new icon will be created on your home screen.
        </p>
        <div className={styles.illustrations}>
          <img src={androidBrowserImg} alt="Chrome Menu" />
          <img src={androidHomescreenImg} alt="Android Home screen" />
        </div>
        <h3>iOS</h3>
        <p>
          With Safari for iOS, go to the website and tap on the "Share" icon at the bottom (the square with an arrow pointing upwards).
          Select the "Add to Home Screen" icon. Give your link button a name and click "Add" - your new icon will appear on your home screen.
        </p>
        <div className={styles.illustrations}>
          <img src={iosBrowserImg} alt="iOS Browser" />
          <img src={iosAddtohomescreenImg} alt="iOS Add to Home screen" />
          <img src={iosHomescreenImg} alt="iOS Home screen" />
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
