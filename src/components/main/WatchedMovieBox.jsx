import { useState } from 'react';

import WatchedMoviesList from './WatchedMovieList';
import WatchedSummary from './WatchedSummary';

const WatchedMoviesBox = ({ watched }) => {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen2((open) => !open)}>
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
};

export default WatchedMoviesBox;
