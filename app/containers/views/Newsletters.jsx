/*
 *
 * Newsletters
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Redux actions
import { toggleEvent } from '../../store/modules/schedule';
import { updateHeaderTitle } from '../../store/modules/ui/header';

// Content
import newslettersSrc from '../../../content/newsletters.json';

// Styles
import View from '../../ui/views/Newsletters';

class Newsletters extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      currentNewsletter: {},
    };
  }

  componentDidMount() {
    this.props.onUpdateHeaderTitle('Newsletters');

    const { newsletters } = this.props;

    // Load current newsletter dynamically
    import(`../../../content/newsletters/${newsletters.current}.json`).then((newsletter) => {
      this.setState({
        currentNewsletter: newsletter,
      });

      // Load news related to the newsletter
      Promise.all(newsletter.news.map((news => import(`../../../content/news/${news}.json`)))).then((news) => {
        this.setState({
          currentNewsletter: Object.assign({}, newsletter, {
            news,
          }),
        });
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.newsletters !== this.props.newsletters ||
      nextState.currentNewsletter !== this.state.currentNewsletter
    );
  }

  render() {
    const { newsletters } = this.props;
    const { currentNewsletter } = this.state;

    return (
      <div>
        <Helmet title="Newsletters" />
        <View newsletters={newsletters} currentNewsletter={currentNewsletter} />
      </div>
    );
  }
}

Newsletters.propTypes = {
  onUpdateHeaderTitle: React.PropTypes.func.isRequired,
  newsletters: React.PropTypes.shape({
    current: React.PropTypes.string,
    archive: React.PropTypes.array,
  }),
};

Newsletters.defaultProps = {
  newsletters: {
    current: '',
    archive: [],
  },
};

function mapStateToProps(state) {
  return {
    schedule: state.schedule,
    newsletters: newslettersSrc,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onToggleEvent: (event) => {
      dispatch(toggleEvent(event));
    },
    onUpdateHeaderTitle: (title) => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Newsletters);
