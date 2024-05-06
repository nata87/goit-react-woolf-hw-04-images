import { Component } from 'react';
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

export default class App extends Component {
  state = { ...INITIAL_STATE };

  async componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.setState({ isLoading: true });
      try {
        const {
          data: { hits, totalHits },
        } = await getPhotoGallery(this.state.query, this.state.page, PER_PAGE);
        const newPhotos = hits.map(({ id, webformatURL, largeImageURL }) => {
          return { id, webformatURL, largeImageURL };
        });
        this.setState({
          galleryPhotos: [...this.state.galleryPhotos, ...newPhotos],
          totalHits,
          isLoading: false,
        });
      } catch (error) {
        this.setState(...INITIAL_STATE);
      }
    }
  }

  handlerSubmit = query => {
    this.setState({ ...INITIAL_STATE, query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  handleModalOpen = largeImageURL => {
    this.setState({ isModalOpen: true, currentPhotoUrl: largeImageURL });
  };

  render() {
    return (
      <div className="App">
        <SearchBar onSubmit={this.handlerSubmit} />
        {this.state.galleryPhotos.length > 0 ? (
          <ImageGallery
            onModalClose={this.handleModalClose}
            onModalOpen={this.handleModalOpen}
            galleryPhotos={this.state.galleryPhotos}
          />
        ) : null}
        {this.state.isLoading && <Loader />}
        {this.state.page < Math.ceil(this.state.totalHits / PER_PAGE) ? (
          <Button onClick={this.handleLoadMore}>Load more</Button>
        ) : null}
        {this.state.isModalOpen && (
          <Modal
            url={this.state.currentPhotoUrl}
            onModalClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
