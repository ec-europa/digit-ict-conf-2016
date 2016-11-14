/*
 *
 * Stand
 *
 */

import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

// Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Content
import stands from '../../../content/stands.json';

// Views
import StandModal from '../../ui/views/Stand/Modal';
import StandPage from '../../ui/views/Stand/Page';
import StandNotFound from '../../ui/views/Stand/NotFound';

class Stand extends React.Component {
  constructor(props) {
    super(props);

    const { standId } = props.params;

    this.state = {
      stand: stands.filter(s => s.id === standId)[0],
    };
  }

  componentDidMount() {
    const { isModal } = this.props;
    if (!isModal) {
      if (this.state.stand) {
        this.props.onUpdateHeaderTitle('Stand details');
      } else {
        this.props.onUpdateHeaderTitle('Stand not found');
      }
    }
  }

  render() {
    const { stand } = this.state;

    // 404 Stand Not Found
    if (!stand) {
      return ([
        <Helmet title="Stand not found" />,
        <StandNotFound />,
      ]);
    }

    const { isModal, onRequestClose } = this.props;

    return (
      <div>
        <Helmet title={`${stand.firstname} ${stand.lastname}`} />
        {
          isModal
            ? <StandModal stand={stand} onRequestClose={onRequestClose} />
            : <StandPage stand={stand} location={location} />
        }
      </div>
    );
  }
}

Stand.propTypes = {
  params: React.PropTypes.object,
  onUpdateHeaderTitle: React.PropTypes.func,
  isModal: React.PropTypes.bool,
  onRequestClose: React.PropTypes.func,
};

Stand.defaultProps = {
  isModal: false,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(withRouter(Stand));