const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const WatchedSummary = ({ watched }) => {
  const imdbRatings = watched
    .map((movie) => movie.imdbRating)
    .filter((movie) => movie !== undefined);

  const userRatings = watched
    .map((movie) => movie.userRating)
    .filter((movie) => movie !== undefined);

  const runtimes = watched
    .map((movie) => movie.runtime)
    .filter((movie) => movie !== undefined);

  const avgImdbRating = average(imdbRatings);
  const avgUserRating = average(userRatings);
  const avgRuntime = average(runtimes);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.trunc(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedSummary;
