/*
 * Gallery
 *
 * This is the first thing users see of our App, at the '/' route
 */
 /* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';

import Link from '../../components/Link/Link';

// Load styles
import styles from './Gallery.scss';

const photosPerPage = 6;

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      pageNum: 0,
      totalPages: props.photos.length / photosPerPage,
      loadedAll: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.loadMorePhotos = this.loadMorePhotos.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.loadMorePhotos(), 500);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50)) {
      this.loadMorePhotos();
    }
  }

  loadMorePhotos(e) {
    if (e) {
      e.preventDefault();
    }

    if (this.state.pageNum >= this.state.totalPages) {
      this.setState({ loadedAll: true });
      return;
    }

    const { photos } = this.props;
    const newPhotos = photos.slice(this.state.pageNum * photosPerPage, (this.state.pageNum + 1) * photosPerPage);

    this.setState({
      photos: this.state.photos ? this.state.photos.concat(newPhotos) : newPhotos,
      pageNum: this.state.pageNum + 1,
      loadedAll: this.state.pageNum + 1 >= this.state.totalPages,
    });
  }

  render() {
    const { photos, loadedAll } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Gallery</h1>
          <p>Selected pictures from the sessions and expo area. Find more photos in <Link to={'https://www.flickr.com/photos/ep_technology/albums/72157677157947156'} target="_blank" rel="noopener noreferrer">this album</Link>.</p>
        </div>
        {photos ? (
          <div>
            <Gallery photos={photos} />
            {!loadedAll && (
              <div className={styles.clearfix}>
                <p className="u-pt-1rem u-ta-center">Keep scrolling down to load more pictures!</p>
              </div>
            )}
          </div>
        ) : (
          <p className="u-pt-1rem u-ta-center">Loading...</p>
        )}
        <div className={styles.clearfix} />
      </div>
    );
  }
}

View.propTypes = {
  photos: PropTypes.array,
};

export default View;
