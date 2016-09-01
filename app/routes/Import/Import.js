/*
 *
 * Import
 *
 */

import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

// Redux actions & helpers
import { importSchedule, decodeSchedule } from '../../store/modules/schedule';
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Components
import ImportPage from '../../components/Import/Page';

class Import extends React.Component {
  constructor(props) {
    super(props);

    // Bindings
    this.decode = this.decode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // State initialization
    this.state = {
      imported: false,
      input: '',
    };
  }

  componentWillMount() {
    const { params } = this.props;
    const { code } = params;

    if (code) {
      this.decode(code);
    }
  }

  componentDidMount() {
    this.props.dispatch(updateHeaderTitle('Import'));
  }

  decode(code) {
    const { dispatch } = this.props;
    const importedSchedule = decodeSchedule(code);
    dispatch(importSchedule(importedSchedule));
    this.setState({
      imported: true,
    });
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    return this.decode(this.state.input);
  }

  render() {
    const { imported, input } = this.state;

    return (
      <div>
        <Helmet title="Import" />
        <ImportPage
          success={imported}
          inputValue={input}
          onInputChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
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