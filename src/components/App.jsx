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

export const KEY = '24bc28ba';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => setSelectedId(null);
  const handleAddWatched = (movie) => setWatched((watched) => [...watched, movie]);
  const handleDeleteWatched = (id) => {
    return setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    const controller = new AbortController();

    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Something went wrong with fetching movies.');

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found.');

        setMovies(data.Search);
        setError('');
      } catch (error) {
        if (error.name !== 'AbortError') setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!query.length) {
      setMovies([]);
      setError('');
      return;
    }

    handleCloseMovie();
    getMovies();

    return () => controller.abort();
  }, [query]);

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
