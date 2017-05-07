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
      status: 'loading',
    };
  }

  componentDidMount() {
    this.props.onUpdateHeaderTitle('Newsletters');

    import('../../../content/newsletters.json')
      .then(newsletters =>
        import(`../../../content/newsletters/${newsletters.current}.json`)
      )
      .then(newsletter => {
        this.setState({
          currentNewsletter: newsletter,
        });

        // Load news related to the newsletter
        return Promise.all(
          newsletter.news.map(news =>
            import(`../../../content/news/${news}.json`)
          )
        );
      })
      .then(news => {
        this.setState(prevState => ({
          currentNewsletter: Object.assign({}, prevState.currentNewsletter, {
            news,
          }),
          status: 'done',
        }));
      })
      .catch(() => {
        this.setState({
          status: 'error',
        });
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  render() {
    const { currentNewsletter, newsletters, status } = this.state;

    return (
      <div>
        <Helmet title="Newsletters" />
        <View
          newsletters={newsletters}
          currentNewsletter={currentNewsletter}
          status={status}
        />
      </div>
    );
  }
}

Newsletters.propTypes = {
  onUpdateHeaderTitle: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: title => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(Newsletters);
