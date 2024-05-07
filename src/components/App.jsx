import { useEffect, useState } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { getPhotoGallery } from '../API';

const INITIAL_STATE = {
  galleryPhotos: [],
  query: '',
  page: 0,
  totalHits: 0,
  isLoading: false,
  isModalOpen: false,
  currentPhotoUrl: '',
};

const PER_PAGE = 12;

const App = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const {
    page,
    query,
    galleryPhotos,
    isLoading,
    totalHits,
    isModalOpen,
    currentPhotoUrl,
  } = state;

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
          setState(prevState => ({
            ...prevState,
            galleryPhotos: [...prevState.galleryPhotos, ...newPhotos],
            totalHits,
            isLoading: false,
          }));
        } catch (error) {
          setState({ ...INITIAL_STATE });
        }
      }
    };

    setImages();
  }, [page, query]);

  const handlerSubmit = query => {
    setState(prevState => ({
      ...INITIAL_STATE,
      isLoading: true,
      query,
      page: 1,
    }));
  };

  const handleLoadMore = () => {
    setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  const handleModalClose = () => {
    setState(prevState => ({
      ...prevState,
      isModalOpen: false,
    }));
  };

  const handleModalOpen = largeImageURL => {
    setState(prevState => ({
      ...prevState,
      isModalOpen: true,
      currentPhotoUrl: largeImageURL,
    }));
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
