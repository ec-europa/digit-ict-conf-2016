/*
 *
 * Stand
 *
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
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

class Stand extends React.PureComponent {
  constructor(props) {
    super(props);

    const { standId } = props.match.params;

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

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { stand } = this.state;
    const { isModal } = this.props;

    // 404 Stand Not Found
    if (!stand) {
      return ([
        <Helmet title="Stand not found" />,
        <StandNotFound />,
      ]);
    }

    const { onRequestClose } = this.props;

    return (
      <div>
        <Helmet title={`${stand.title}`} />
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
  match: React.PropTypes.object,
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
