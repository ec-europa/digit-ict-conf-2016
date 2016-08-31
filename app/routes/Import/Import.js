/*
 *
 * Import
 *
 */

import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

// Redux actions
import { importSchedule } from '../../store/modules/schedule';
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Components
import ImportPage from '../../components/Import/Page';

class Import extends React.Component {
  componentDidMount() {
    this.props.dispatch(updateHeaderTitle('Import'));
  }

  render() {
    const { params, dispatch } = this.props;
    const { data } = params;
    let success = true;

    try {
      const decodedData = JSON.parse(data);
      dispatch(importSchedule(decodedData));
    } catch (err) {
      success = false;
    }

    return (
      <div>
        <Helmet title="Import" />
        <ImportPage success={success} />
      </div>
    );
  }
}

Import.propTypes = {
  params: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(withRouter(Import));
