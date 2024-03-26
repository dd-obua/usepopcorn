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

const KEY = '24bc28ba';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        if (!res.ok) throw new Error('Something went wrong with fetching movies.');

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found.');

        setMovies(data.Search);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading ? <Loader /> : <MovieList movies={movies} />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
