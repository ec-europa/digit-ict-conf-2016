/**
*
* Drawer
*
*/

import React from 'react';
import { Drawer as MDLDrawer, Navigation } from 'react-mdl';
import { Link } from 'react-router';

import logo from './images/DIGITEC-logo-v.png';
import styles from './styles.css';

class Drawer extends React.Component {
  componentDidMount() {
    // Close drawer on click
    const drawer = document.querySelector('.mdl-layout__drawer');
    drawer.addEventListener('click', () => {
      document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
      drawer.classList.remove('is-visible');
    }, false);
  }

  render() {
    const title = (
      <img className={styles.drawerLogo} alt="Logo" src={logo} />
    );

    return (
      <MDLDrawer title={title}>
        <Navigation>
          <Link to={'/'}>Home</Link>
          <Link to={'/speakers'}>Speakers</Link>
          <Link to={'/programme'}>Programme</Link>
          <Link to={'/programme'}>Expo</Link>
          <Link to={'/programme'}>Practical</Link>
          <Link to={'/programme'}>Previous editions</Link>
          <div className={styles.drawerSeparator} />
          <Link to={'/'}>Register</Link>
          <Link to={'/'}>#digitec16</Link>
        </Navigation>
      </MDLDrawer>
    );
  }
}

export default Drawer;
