/**
 * Root
 */
import React from 'react';
import Helmet from 'react-helmet';

// Containers
import LayoutContainer from './containers/Layout';
import ModalContainer from './containers/Modal';
import SnackbarContainer from './containers/Snackbar';

// Styles
import styles from './Root.scss';

const Root = ({ children, location }) => (
  <div className={styles.app}>
    <Helmet titleTemplate="DIGITEC 2016 - %s" />
    {children}
    <LayoutContainer location={location}>
      {children}
    </LayoutContainer>
    <ModalContainer />
    <SnackbarContainer />
  </div>
);

Root.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};

export default Root;
