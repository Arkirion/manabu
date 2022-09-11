import React from "react";
import './_Header.sass'

import logo from '../../assets/logo.png'

function Header() {
  return (
    <header>
      <div className="logo"> <img src={logo} alt="" /> </div>
      {/* <nav>
        <ul>
          <li>DICCIONARIO</li>
          <li>LETRA ALEATORIA</li>
          <li>PALABRA ALEATORIA</li>
        </ul>
      </nav> */}
    </header>
  );
}

export default Header;
