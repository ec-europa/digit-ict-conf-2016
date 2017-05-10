/*
 * Gallery
 *
 * This is the first thing users see of our App, at the '/' route
 */
/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import Measure from 'react-measure';

// Load styles
import styles from './Gallery.scss';

const photosPerPage = 6;

const refactorPhotos = photos =>
  photos.map(photo => ({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    srcset: [
      `${photo.lightboxImage.src} ${photo.width * 2}w`,
      `${photo.src} ${photo.width}w`,
    ],
  }));

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      pageNum: 0,
      totalPages: props.photos.length / photosPerPage,
      loadedAll: false,
      currentImage: 0,
      lightboxIsOpen: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.loadMorePhotos = this.loadMorePhotos.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.loadMorePhotos(), 500);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
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
    const newPhotos = refactorPhotos(
      photos.slice(
        this.state.pageNum * photosPerPage,
        (this.state.pageNum + 1) * photosPerPage
      )
    );

    this.setState({
      photos: this.state.photos
        ? this.state.photos.concat(newPhotos)
        : newPhotos,
      pageNum: this.state.pageNum + 1,
      loadedAll: this.state.pageNum + 1 >= this.state.totalPages,
    });
  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    const { photos, loadedAll } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Gallery</h1>
          <p>
            Selected pictures from the sessions and expo area. Find more photos in
            {' '}
            <a
              href="https://www.flickr.com/photos/ep_technology/albums/72157677157947156"
              target="_blank"
              rel="noopener noreferrer"
            >
              this album
            </a>
            .
          </p>
        </div>
        {photos
          ? <div>
              <Measure whitelist={['width']}>
                {({ width }) => {
                  let cols = 1;
                  if (width >= 480) {
                    cols = 2;
                  }
                  if (width >= 1024) {
                    cols = 3;
                  }
                  return (
                    <Gallery
                      photos={photos}
                      cols={cols}
                      onClickPhoto={this.openLightbox}
                    />
                  );
                }}
              </Measure>
              {!loadedAll &&
                <div className={styles.clearfix}>
                  <p className="u-pt-1rem u-ta-center">
                    Keep scrolling down to load more pictures!
                  </p>
                </div>}
              <Lightbox
                images={photos}
                backdropClosesModal
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
                showImageCount={false}
              />
            </div>
          : <p className="u-pt-1rem u-ta-center">Loading...</p>}
        <div className={styles.clearfix} />
      </div>
    );
  }
}

View.propTypes = {
  photos: PropTypes.array,
};

View.defaultProps = {
  photos: [],
};

export default View;
