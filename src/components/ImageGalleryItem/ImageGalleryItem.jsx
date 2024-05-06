import LazyLoad from 'react-lazy-load';
import styles from './ImagegalleryItem.module.css';

function ImageGalleryItem({
  onModalOpen,
  photoData: { webformatURL, largeImageURL },
}) {
  return (
    <li className={styles.ImageGalleryItem}>
      <LazyLoad>
        <img
          className={styles['ImageGalleryItem-image']}
          src={webformatURL}
          onClick={() => onModalOpen(largeImageURL)}
          alt="Gallery item"
        />
      </LazyLoad>
    </li>
  );
}

export default ImageGalleryItem;
