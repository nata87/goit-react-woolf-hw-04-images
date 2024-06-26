import { useEffect } from 'react';
import styles from './Modal.module.css';

const Modal = ({ url, onModalClose }) => {
  useEffect(() => {
    const handleKeydownESC = event => {
      if (event.key === 'Escape') {
        onModalClose();
      }
    };

    document.addEventListener('keydown', handleKeydownESC);
    return () => document.removeEventListener('keydown', handleKeydownESC);
  }, [onModalClose]);

  const handleDropDownClick = event => {
    if (event.target.id === 'Overlay') {
      onModalClose();
    }
  };

  return (
    <div onClick={handleDropDownClick} className={styles.Overlay} id="Overlay">
      <div className={styles.Modal}>
        <img src={url} alt="Gallery item" />
      </div>
    </div>
  );
};

export default Modal;
