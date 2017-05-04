/*
 *
 * Newsletters
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

// Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Styles
import View from '../../ui/views/Newsletters';

class Newsletters extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      currentNewsletter: {},
      newsletters: [],
    };
  }

  componentDidMount() {
    this.props.onUpdateHeaderTitle('Newsletters');

    import('../../../content/newsletters.json')
      .then(newsletters => import(`../../../content/newsletters/${newsletters.current}.json`))
      .then((newsletter) => {
        this.setState({
          currentNewsletter: newsletter,
        });

        // Load news related to the newsletter
        return Promise.all(newsletter.news.map((news => import(`../../../content/news/${news}.json`))));
      })
      .then((news) => {
        this.setState(prevState => ({
          currentNewsletter: Object.assign({}, prevState.currentNewsletter, {
            news,
          }),
        }));
      });
  }

  render() {
    const { currentNewsletter, newsletters } = this.state;

    return (
      <div>
        <Helmet title="Newsletters" />
        <View newsletters={newsletters} currentNewsletter={currentNewsletter} />
      </div>
    );
  }
}

Newsletters.propTypes = {
  onUpdateHeaderTitle: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Newsletters);
