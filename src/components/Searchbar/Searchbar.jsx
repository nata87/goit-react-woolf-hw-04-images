import { useState } from 'react';
import styles from './Searchbar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [state, setState] = useState({ query: '' });

  const handlerSubmitForm = ev => {
    ev.preventDefault();
    if (!state.query.trim()) {
      return;
    }
    onSubmit(state.query);
  };

  const handlerInput = ev => {
    setState({ query: ev.target.value });
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handlerSubmitForm} className={styles.SearchForm}>
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
          value={state.query}
          onChange={handlerInput}
        />
      </form>
    </header>
  );
};

export default SearchBar;
