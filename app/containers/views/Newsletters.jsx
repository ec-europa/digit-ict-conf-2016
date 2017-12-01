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
      newsletters: [],
      status: 'loading',
    };
  }

  componentDidMount() {
    this.props.onUpdateHeaderTitle('Newsletters');

    import('../../../content/newsletters.json')
      .then(newslettersManifest =>
        // Load news related to the newsletter
        Promise.all(
          newslettersManifest.list.map(newsletter =>
            import(`../../../content/newsletters/${newsletter}.json`)
          )
        )
      )
      .then(newsletters => {
        this.setState({
          newsletters,
        });

        // Load news related to the newsletter
        return Promise.all(
          newsletters.map((newsletter, index) =>
            Promise.all(
              newsletter.news.map(news =>
                import(`../../../content/news/${news}.json`)
              )
            ).then(news =>
              this.setState(prevState => {
                // Make a copy
                const newNewsletters = prevState.newsletters.slice();
                // Update
                newNewsletters[index] = Object.assign(
                  {},
                  newNewsletters[index],
                  {
                    news,
                  }
                );

                return {
                  newsletters: newNewsletters,
                };
              })
            )
          )
        );
      })
      .then(() =>
        this.setState({
          status: 'done',
        })
      )
      .catch(() =>
        this.setState({
          status: 'error',
        })
      );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  render() {
    const { newsletters, status } = this.state;

    return (
      <div>
        <Helmet title="Newsletters" />
        <View newsletters={newsletters} status={status} />
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
