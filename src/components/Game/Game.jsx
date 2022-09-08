import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./_Game.sass";
import { hiragana } from "../../common/utils/maps";
// import a from '../../assets'

function Game() {
  const route = "/src/assets/hiragana/";
  const [image, setImage] = useState("a");
  const [suffle, setSuffle] = useState([]);

  const bootstrapHandler = () => {
    const suffledHiragana = suffleHiragana();
    setImage(suffledHiragana.pop());
    setSuffle([...suffledHiragana]);
  };

  const hideHint = () => {
    
  }

  // get random hiragana positions
  const suffleHiragana = () => {
    const hiraganaSuffled = [];
    const hiraganaCopy = [...hiragana];
    const arrayIndex = 0;

    for (let index = 0; index < hiragana.length; index++) {
      const random = Math.floor(Math.random() * hiraganaCopy.length);
      const ruffle = hiraganaCopy.splice(random, 1)[arrayIndex];
      hiraganaSuffled.push(ruffle);
    }

    return hiraganaSuffled;
  };

  const nextLetter = () => {
    setImage(suffle.pop());
    setSuffle([...suffle]);
  };

  useEffect(() => {
    bootstrapHandler();
  }, []);


  return (
    <div className="game-container">
      <small>
        {" "}
        Escribe el nombre de la letra en hiragana e intenta adivinar !
      </small>
      <div className="token">
        <img src={`${route}${image}.png`} alt="" />
        <small>{image}</small>
      </div>
      <main className="actions">
        <Button text="REVELAR" />
        <input type="text" placeholder="Escribe tu respuesta aquí" />
        <Button text="SIGUIENTE" secondary={true} handler={nextLetter} />
      </main>
      <footer>
        <Button text="RESET" secondary={true} handler={bootstrapHandler} />
        <span>
          {" "}
          {hiragana.length - suffle.length} / {hiragana.length}
        </span>
      </footer>
    </div>
  );
}

export default Game;
