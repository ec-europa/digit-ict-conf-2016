/**
*
* Navigation
*
*/
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import Headroom from 'headroom.js';
import styles from './Navigation.scss';

import Link from '../../Link/Link';
import NavigationItem from './components/Item/Item';
import NavigationSeparator from './components/Separator/Separator';

import europaLogo from './images/europa.svg';
import ictLogo from './images/digitec.svg';

class Navigation extends React.PureComponent {
  constructor(props) {
    super(props);

    // Bindings
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRequestToggleDrawer = this.handleRequestToggleDrawer.bind(this);

    // Init
    this.header = null;
    this.navigation = null;
    this.headroom = null;
  }

  componentDidMount() {
    this.headroom = new Headroom(this.header, {
      offset: 0,
      tolerance: 5,
      classes: {
        initial: styles.headroom,
        pinned: styles.headroomPinned,
        unpinned: styles.headroomUnpinned,
        top: styles.headroomTop,
      },
    });

    this.headroom.init();
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('focus', this.handleFocusChange, true);
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.isModal && nextProps !== this.props;
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('focus', this.handleFocusChange);
    this.headroom.destroy();
  }

  handleFocusChange() {
    if (this.header.contains(document.activeElement)) {
      // Make sure to pin the header when a child is focused
      this.headroom.pin();

      // Toggle the drawer if it's closed
      if (!this.props.drawerOpen && this.navigation.contains(document.activeElement)) {
        this.props.onToggleDrawer();
        event.preventDefault();
      }
    } else if (this.props.drawerOpen) {
      this.props.onToggleDrawer();
      event.preventDefault();
    }
  }

  handleKeyDown(event) {
    // Close drawer on ESC
    if (this.props.drawerOpen && event.keyCode === 27) {
      event.preventDefault();
      this.props.onToggleDrawer();
    }
  }

  handleRequestToggleDrawer(event) {
    event.preventDefault();
    this.props.onToggleDrawer();
  }

  render() {
    const { title, drawerOpen } = this.props;

    return (
      <nav className={styles.container} ref={(c) => { this.header = c; }}>
        <input type="checkbox" id="toggleDrawer" className={styles.toggleDrawer} checked={drawerOpen} />
        <div className={styles.mobileBar}>
          <label htmlFor="toggleDrawer" className={styles.navToggle} onClick={this.handleRequestToggleDrawer} role="button">
            <span />
            <span />
            <span />
          </label>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{title}</h1>
          </div>
        </div>
        <label htmlFor="toggleDrawer" className={styles.overlay} onClick={this.handleRequestToggleDrawer} role="button" />
        <div className={styles.navigation} ref={(c) => { this.navigation = c; }}>
          <div className={styles.innerNavigation}>
            <div className={styles.navigationHeader}>
              <div className={styles.logos}>
                <Link to={'http://europa.eu/index_en.htm'} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <img src={europaLogo} className={styles.europaLogo} alt="DIGITEC 2016" />
                </Link>
                <Link to={'/'} className={styles.link}>
                  <img src={ictLogo} className={styles.ictLogo} alt="DIGITEC 2016" />
                </Link>
              </div>
              <div className={styles.navigationHeaderTitle}>
                <h1>29 November, 2016</h1>
              </div>
              <div className={styles.navigationHeaderTitle}>
                <h1>Square Brussels</h1>
              </div>
            </div>
            <ul className={styles.navLinks}>
              <NavigationItem to={'/'} index mobileOnly>Home</NavigationItem>
              <NavigationItem to={'/speakers'}>Speakers</NavigationItem>
              <NavigationItem to={'/programme'}>Programme</NavigationItem>
              <NavigationItem to={'/my-digitec'} mobileOnly>My DIGITEC</NavigationItem>
              <NavigationItem to={'/expo'}>Expo</NavigationItem>
              <NavigationItem to={'/gallery'}>Gallery</NavigationItem>
              <NavigationItem to={'/practical'}>Practical</NavigationItem>
              <NavigationItem to={'/newsletters'}>Newsletter</NavigationItem>
              <NavigationSeparator />
              <NavigationItem to={'https://twitter.com/hashtag/digitec16'} target="_blank" rel="noopener noreferrer" mobileOnly>#digitec16</NavigationItem>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {
  drawerOpen: React.PropTypes.bool,
  // eslint-disable-next-line react/no-unused-prop-types
  isModal: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
  title: React.PropTypes.string,
};

Navigation.defaultProps = {
  drawerOpen: false,
  isModal: false,
  onToggleDrawer: () => {},
  title: '',
};

export default Navigation;
