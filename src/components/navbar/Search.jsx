import { useEffect, useRef } from 'react';

const Search = ({ query, setQuery }) => {
  const inputElem = useRef(null);

  useEffect(() => {
    inputElem.current.focus();
  }, []);

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
