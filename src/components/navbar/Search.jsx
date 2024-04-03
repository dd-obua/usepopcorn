import { useEffect, useRef } from 'react';
import { useKeyPress } from '../../useKeyPress';

const Search = ({ query, setQuery }) => {
  const inputElem = useRef(null);
  const focusInput = () => inputElem.current.focus();

  useEffect(() => focusInput(), []);

  useKeyPress('Enter', () => {
    if (document.activeElement === inputElem.current) return;
    focusInput();
    setQuery('');
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElem}
    />
  );
};

export default Search;
