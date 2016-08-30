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

// Components
import ImportPage from '../../components/Import/Page';

const Import = ({ params, dispatch }) => {
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
};

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
