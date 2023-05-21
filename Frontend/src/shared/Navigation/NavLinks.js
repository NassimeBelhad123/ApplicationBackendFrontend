import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

function NavLinks(props) {
  return (

    
    <ul className="nav-links">
      
      
      <li className="dropdown">
        <NavLink to="/pages">Pages</NavLink>
        <ul className="dropdown-menu">
          <li><NavLink to="/deroulement">Déroulement</NavLink></li>
          <li><NavLink to="/profil&competence">Profil & compétences</NavLink></li>
          <li><NavLink to="/FAQ">FAQ</NavLink></li>
        </ul>
      </li>
      

     


      <li>
        <NavLink to="/" exact>Accueil</NavLink>
      </li>
      
    </ul>
    
  );
};

export default NavLinks;
