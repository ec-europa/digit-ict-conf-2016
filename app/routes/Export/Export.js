/*
 *
 * Export
 *
 */

import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

// Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Schedule helper
import { encodeSchedule } from '../../store/modules/schedule';

// Components
import ExportModal from '../../components/Export/Modal';
import ExportPage from '../../components/Export/Page';

class Export extends React.Component {
  componentDidMount() {
    const { isModal } = this.props;
    if (!isModal) {
      this.props.onUpdateHeaderTitle('Export');
    }
  }

  render() {
    const { schedule, isModal, onRequestClose } = this.props;
    const code = encodeSchedule(schedule);
    const url = window.location.href.replace('export', 'import/') + encodeURIComponent(code);

    return (
      <div>
        <Helmet title="Export" />
        {isModal
          ? <ExportModal code={code} url={url} onRequestClose={onRequestClose} />
          : <ExportPage code={code} url={url} />
        }
      </div>
    );
  }
}

Export.propTypes = {
  params: React.PropTypes.object,
  onUpdateHeaderTitle: React.PropTypes.func,
  schedule: React.PropTypes.object,
  isModal: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
};

Export.defaultProps = {
  isModal: false,
  schedule: {},
};

function mapStateToProps(state) {
  return {
    schedule: state.schedule,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Export));
