/*
 *
 * News
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

// Components
import NewsModal from '../../ui/views/News/Modal';
import NewsPage from '../../ui/views/News/Page';
import NewsNotFound from '../../ui/views/News/NotFound';

// Redux actions
import { updateHeaderTitle } from '../../store/modules/ui/header';

class News extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      news: {},
      status: 'loading',
    };
  }

  componentDidMount() {
    const { isModal } = this.props;
    this.props.onUpdateHeaderTitle('Loading news...');

    // Load content
    import(`../../../content/news/${this.props.match.params.newsId}`)
      .then(news => {
        this.setState({
          news,
          status: 'loaded',
        });

        if (!isModal) {
          this.props.onUpdateHeaderTitle(news.title);
        }
      })
      .catch(() => {
        this.setState({
          status: 'notfound',
        });

        if (!isModal) {
          this.props.onUpdateHeaderTitle('News not found');
        }
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  render() {
    const { news, status } = this.state;
    const { isModal, onRequestClose } = this.props;

    if (status === 'notfound') {
      return (
        <div>
          <Helmet title="News not found" />
          <NewsNotFound />
        </div>
      );
    }

    return (
      <div>
        <Helmet title={news.title} />
        {isModal
          ? <NewsModal news={news} onRequestClose={onRequestClose} />
          : <NewsPage news={news} />}
      </div>
    );
  }
}

News.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      newsId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onUpdateHeaderTitle: PropTypes.func.isRequired,
  isModal: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

News.defaultProps = {
  isModal: false,
  onRequestClose: () => {},
};

function mapDispatchToProps(dispatch) {
  return {
    onUpdateHeaderTitle: title => {
      dispatch(updateHeaderTitle(title));
    },
  };
}

export default connect(null, mapDispatchToProps)(News);
