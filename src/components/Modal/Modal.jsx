import { Component } from 'react';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydownESC);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydownESC);
  }

  handleDropDownClick = event => {
    const { onModalClose } = this.props;
    if (event.target.id === 'Overlay') {
      onModalClose();
    }
  };

  handleKeydownESC = event => {
    const { onModalClose } = this.props;
    if (event.key === 'Escape') {
      onModalClose();
    }
  };

  render() {
    const { url } = this.props;
    return (
      <div
        onClick={this.handleDropDownClick}
        className={styles.Overlay}
        id="Overlay"
      >
        <div className={styles.Modal}>
          <img src={url} alt="Gallery item" />
        </div>
      </div>
    );
  }
}

export default Modal;
