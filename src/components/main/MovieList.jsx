import Movie from './Movie';

const MovieList = ({ movies, onSelectMovie, onCloseMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectMovie={onSelectMovie}
          onCloseMovie={onCloseMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;
