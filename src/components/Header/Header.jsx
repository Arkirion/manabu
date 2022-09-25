import React from "react";
import { logoImageRoute } from "../../common/utils/constants";
import './_Header.sass'

function Header() {
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="main-header">
      <div className="logo"> <img src={logoImageRoute} alt="" /> </div>
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
