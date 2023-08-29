import PropTypes from 'prop-types';
export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  openModal,
}) => {
  return (
    <li>
      <img
        loading="lazy"
        src={webformatURL}
        alt={tags}
        width="300px"
        height="250px"
        onClick={() => {
          openModal({ src: largeImageURL, alt: tags });
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func,
};
