import React from "react";
import './_Header.sass'

import logo from '../../assets/logo.png'

function Header() {
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header>
      <div className="logo"> <img src={logo} alt="" /> </div>
      <nav>
        <ul>
          <li onClick={(e) => openInNewTab('https://www.nhk.or.jp/lesson/es/letters/hiragana.html')}>DICCIONARIO</li>
          {/* <li>LETRA ALEATORIA</li>
          <li>PALABRA ALEATORIA</li> */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
