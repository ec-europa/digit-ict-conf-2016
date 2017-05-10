/**
*
* Speakers/Page
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
// Styles
import styles from './Modal.scss';

const processPhotos = photos =>
  photos.map(photo => ({
    ...photo,
    src: `${__BASENAME__}/static/${photo.src}`,
    srcset: photo.srcset
      ? photo.srcset.map(srcset => {
          const [, path, width] = srcset.match(/^(.*) (.*)/);
          return `${__BASENAME__}/static/${path} ${width}`;
        })
      : [],
  }));

class Page extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      photos: props.news.gallery ? processPhotos(props.news.gallery) : null,
      currentImage: 0,
      lightboxIsOpen: false,
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.news !== this.props.news) {
      this.setState({
        photos: nextProps.news.gallery
          ? processPhotos(nextProps.news.gallery)
          : null,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.news !== this.props.news || nextState !== this.state;
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
    const { news } = this.props;
    const { photos } = this.state;

    return (
      <div className={styles.pageContainer}>
        <h1>{news.title}</h1>
        <img
          src={`${__BASENAME__}/static/${news.image}`}
          alt={news.title}
          className={styles.pageImage}
        />
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: (news.body || []).join('') }}
        />
        {photos &&
          <div>
            <h4>Gallery</h4>
            <Gallery
              photos={photos}
              cols={3}
              onClickPhoto={this.openLightbox}
            />
            <Lightbox
              images={photos}
              backdropClosesModal
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
            />
          </div>}
      </div>
    );
  }
}

Page.propTypes = {
  news: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.array,
    gallery: PropTypes.array,
  }),
};

Page.defaultProps = {
  news: {},
};

export default Page;
