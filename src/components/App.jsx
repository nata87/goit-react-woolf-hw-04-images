import { useEffect, useState } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { getPhotoGallery } from '../API';

const PER_PAGE = 12;

const App = () => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState('');

  useEffect(() => {
    const setImages = async () => {
      if (query) {
        try {
          const {
            data: { hits, totalHits },
          } = await getPhotoGallery(query, page, PER_PAGE);
          const newPhotos = hits.map(({ id, webformatURL, largeImageURL }) => {
            return { id, webformatURL, largeImageURL };
          });
          setGalleryPhotos(prev => [...prev, ...newPhotos]);
          setTotalHits(totalHits);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    setImages();
  }, [page, query]);

  const handlerSubmit = query => {
    setIsLoading(true);
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev.page + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(true);
  };

  const handleModalOpen = largeImageURL => {
    setIsModalOpen(true);
    setCurrentPhotoUrl(largeImageURL);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handlerSubmit} />
      {galleryPhotos.length > 0 ? (
        <ImageGallery
          onModalClose={handleModalClose}
          onModalOpen={handleModalOpen}
          galleryPhotos={galleryPhotos}
        />
      ) : null}
      {isLoading && <Loader />}
      {page < Math.ceil(totalHits / PER_PAGE) ? (
        <Button onClick={handleLoadMore}>Load more</Button>
      ) : null}
      {isModalOpen && (
        <Modal url={currentPhotoUrl} onModalClose={handleModalClose} />
      )}
    </div>
  );
};

export default App;
