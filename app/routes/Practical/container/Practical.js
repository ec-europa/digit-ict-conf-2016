/**
 * Practical
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './Practical.scss';
import $script from 'scriptjs';
import Helmet from 'react-helmet';
import { updateHeaderTitle } from '../../../store/modules/layout';

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
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(Practical);
