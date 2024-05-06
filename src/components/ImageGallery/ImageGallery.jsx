import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

function ImageGallery({ galleryPhotos, onModalOpen }) {
  return (
    <ul className={styles.ImageGallery}>
      {galleryPhotos.map((photo, index) => (
        <ImageGalleryItem
          key={`${photo.webformatURL}-${index}`}
          photoData={photo}
          onModalOpen={onModalOpen}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;
