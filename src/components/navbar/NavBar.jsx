import { useState } from 'react';

import Logo from './Logo';
import Search from './Search';
import NumResults from './NumResults';

const NavBar = ({ movies }) => {
  const [query, setQuery] = useState('');

  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NumResults movies={movies} />
    </nav>
  );
};

export default NavBar;
