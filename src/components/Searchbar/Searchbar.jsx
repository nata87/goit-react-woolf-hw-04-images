import { Component } from 'react';
import styles from './Searchbar.module.css';

class SearchBar extends Component {
  state = { query: '' };

  handlerSubmitForm = ev => {
    ev.preventDefault();
    const { onSubmit } = this.props;
    if (!this.state.query.trim()) {
      return;
    }
    onSubmit(this.state.query);
  };

  handlerInput = ev => {
    this.setState({ query: ev.target.value });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form onSubmit={this.handlerSubmitForm} className={styles.SearchForm}>
          <button type="submit" className={styles['SearchForm-button']}>
            <span className={styles['SearchForm-button-label']}>Search</span>
          </button>
          <input
            className={styles['SearchForm-input']}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handlerInput}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
