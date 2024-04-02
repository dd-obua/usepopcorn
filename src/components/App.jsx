import { useEffect, useState } from 'react';

import NavBar from './navbar/NavBar';
import Main from './main/Main';
import Search from './navbar/Search';
import NumResults from './navbar/NumResults';

import Box from './main/Box';
import Loader from './main/Loader';
import ErrorMessage from './main/ErrorMessage';
import MovieList from './main/MovieList';
import WatchedMoviesList from './main/WatchedMovieList';
import WatchedSummary from './main/WatchedSummary';
import MovieDetails from './main/MovieDetails';

import { useMovies } from '../useMovies';
import { useLocalStorageState } from '../useLocalStorageState';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  function handleCloseMovie() {
    setSelectedId(null);
  }
  const handleAddWatched = (movie) => setWatched((watched) => [...watched, movie]);
  const handleDeleteWatched = (id) => {
    return setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
