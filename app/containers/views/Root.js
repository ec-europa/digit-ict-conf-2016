/**
 * Root
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Redux actions
import { toggleDrawer } from '../../store/modules/ui/drawer';

import Layout from '../../ui/layout';

class Root extends React.Component {
  constructor(props) {
    super(props);

    // Init location state
    props.location.state = { // eslint-disable-line
      modal: false,
    };

    this.state = {
      previousChildren: null,
      previousLocation: '',
      isModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    // if we changed routes...
    if (nextProps.location.key !== this.props.location.key) {
      if (nextProps.location.state && nextProps.location.state.modal) {
        // save the old children (just like animation)
        if (!this.state.isModal) {
          this.setState({
            previousChildren: this.props.children,
            previousLocation: this.props.location.pathname,
            isModal: true,
          });
        }
      } else {
        this.setState({
          previousChildren: null,
          previousLocation: '',
          isModal: false,
        });
      }
    }
  }

  render() {
    const { children, location, drawerOpen, onToggleDrawer, headerTitle } = this.props;
    const { isModal, previousChildren, previousLocation } = this.state;

    return (
      <div>
        <Helmet titleTemplate="DIGITEC 2016 - %s" />
        <Layout
          location={location}
          drawerOpen={drawerOpen}
          onToggleDrawer={onToggleDrawer}
          isModal={isModal}
          previousChildren={previousChildren}
          previousLocation={previousLocation}
          headerTitle={headerTitle}
        >
          {children}
        </Layout>
      </div>
    );
  }
}

Root.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  drawerOpen: React.PropTypes.bool,
  onToggleDrawer: React.PropTypes.func,
  headerTitle: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    drawerOpen: state.ui.drawer.isOpen,
    headerTitle: state.ui.header.title,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleDrawer: () => {
      dispatch(toggleDrawer());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
