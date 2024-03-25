import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
// import './css/styles.css';
import StarRating from './components/StarRating';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <StarRating maxRating={10} />
    <StarRating
      maxRating={5}
      color="green"
      size={36}
      className="test"
      messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
    />
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
