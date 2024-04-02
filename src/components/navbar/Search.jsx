import { useEffect, useRef } from 'react';

const Search = ({ query, setQuery }) => {
  const inputElem = useRef(null);
  const focusInput = () => inputElem.current.focus();

  useEffect(() => {
    focusInput();

    const activate = (e) => {
      if (document.activeElement === inputElem.current) return;
      if (e.key === 'Enter') {
        focusInput();
        setQuery('');
      }
    };

    document.addEventListener('keydown', activate);

    return () => document.addEventListener('keydown', activate);
  }, [setQuery]);

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
