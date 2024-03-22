import { useState } from 'react';
import { tempWatchedData } from '../App';

import ListBox from './ListBox';
import WatchedMoviesBox from './WatchedMovieBox';

const Main = ({ movies }) => {
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedMoviesBox watched={watched} />
    </main>
  );
};

export default Main;
