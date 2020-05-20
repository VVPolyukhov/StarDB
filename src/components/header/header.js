import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

const Header = ({ onServiceChange }) => {
  return (
    <div className="header d-flex">
      <h3>
        <Link to="/">
          StarDB
        </Link>
      </h3>
      <ul className="d-flex">

        <Link to="/people/"><li>People</li></Link>


        <Link to="/planets/"><li>Planets</li></Link>


        <Link to="/starships/"><li>Starships</li></Link>

      </ul>
    </div>
  );
};

export default Header;