import { useEffect, useState } from 'react';
import { KEY } from '../App';
import StarRating from '../StarRating';

const MovieDetails = ({ selectedId, onCloseMovie }) => {
  const [movie, setMovie] = useState({});
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const getMovieDetails = async () => {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
    };

    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${movie}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span> {imdbRating}
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
};

export default MovieDetails;
