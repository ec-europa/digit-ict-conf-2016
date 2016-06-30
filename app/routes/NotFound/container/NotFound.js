/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styles from './NotFound.scss';
import { updateHeaderTitle } from '../../../store/modules/layout';

class NotFound extends React.Component {
  componentDidMount() {
    this.props.onUpdateHeaderTitle('Page Not Found');
  }

  render() {
    return (
      <div className={styles.container}>
        <Helmet title="Page not found" />
        <div className={styles.header}>
          <h1>Page Not Found</h1>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
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

export default connect(null, mapDispatchToProps)(NotFound);
