import React, {useState} from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../Backdrop"

import "./MainNavigation.css";

function MainNavigation(props) {

  const [tiroirOuvert, setTiroirOuvert] = useState(false);

  const ouvrirTiroir = () => {
    setTiroirOuvert(true);
  };

  const fermerTiroir = () => {
    setTiroirOuvert(false);
  };

  return (
    <React.Fragment>
      {tiroirOuvert && <Backdrop onClick={fermerTiroir} />}
        <SideDrawer show={tiroirOuvert} onClick={fermerTiroir}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={ouvrirTiroir}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/"><img src="https://th.bing.com/th/id/R.092fa299d965b753d3bcef99ed52f1c0?rik=UeHFXpGsRIzV2A&riu=http%3a%2f%2fpierre-luc-delisle.com%2fwp-content%2fuploads%2fLogomo_1400.png&ehk=%2fw2fSI8Nz99FyXdwLdP1X%2fykuWjFMPSHMqiePcBg3HE%3d&risl=&pid=ImgRaw&r=0" alt="description_de_l_image" className="image" /></Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;
