import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
// import './css/styles.css';
import StarRating from './components/StarRating';

const Test = () => {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars.</p>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <StarRating maxRating={10} />
    <StarRating
      maxRating={5}
      // maxRating={5}
      color="green"
      size={36}
      className="test"
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
    />
    <Test />
  </StrictMode>
);

// StarRating
{
  /* <StarRating maxRating={5} defaultRating={3} />
    <StarRating
      color="green"
      size={36}
      className="test"
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
    />
    <Test /> */
}
