import { useEffect, useState } from 'react';

export const KEY = '24bc28ba';

export const useMovies = (query, callback) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // callback?.();

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

    getMovies();

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, error };
};
