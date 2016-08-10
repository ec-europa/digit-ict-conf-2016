/**
 *
 * HeaderTitleContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';

// Components
import { HeaderTitle } from '../../components/Layout/Header';

const HeaderTitleContainer = ({ headerTitle }) => (
  <HeaderTitle title={headerTitle} />
);

HeaderTitleContainer.propTypes = {
  headerTitle: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    headerTitle: state.ui.header.title,
  };
}

export default connect(mapStateToProps)(HeaderTitleContainer);
