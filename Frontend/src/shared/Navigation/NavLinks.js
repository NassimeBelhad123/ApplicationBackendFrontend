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
          <li><NavLink to="/texteFormulaireEmployeurs">Formulaire Employeur</NavLink></li>
        </ul>
      </li>
      

      <li>
         <NavLink to="/NouveauStage" style={{ display: 'inline-block' }}>
            Ajouter stage
        </NavLink>
      </li>

      <li>
        <NavLink to="/NouvelEtudiant" style={{display: 'inline-block'}}>
          Ajouter étudiant
        </NavLink>
      </li>

      <li>
        <NavLink to ="/ListeEtudiants">Liste d'étudiants</NavLink>
      </li>

      <li>
        <NavLink to ="/ListeStages">Liste stages</NavLink>
      </li>


      <li>
        <NavLink to="/" exact>Accueil</NavLink>
      </li>
      
    </ul>
    
  );
};

export default NavLinks;
