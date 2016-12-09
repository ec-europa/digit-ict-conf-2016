/*
 * Gallery
 *
 * This is the first thing users see of our App, at the '/' route
 */
 /* eslint-disable react/no-danger */

import React from 'react';
import Gallery from 'react-photo-gallery';

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
    setTimeout(() => this.loadMorePhotos(), 300);
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
        </div>
        {photos ? (
          <div>
            <Gallery photos={photos} />
            {!loadedAll && (
              <p>Load more...</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className={styles.clearfix} />
      </div>
    );
  }
}

View.propTypes = {
  photos: React.PropTypes.array,
};

export default View;
