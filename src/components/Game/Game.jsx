import React, { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import "./_Game.sass";
import { hiragana } from "../../common/utils/maps";
// import a from '../../assets'

function Game() {
  const route = "/src/assets/hiragana/";
  const [imageName, setImageName] = useState("a");
  const [suffle, setSuffle] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [nextButtonIsDisabled, setNextButtonIsDisabled] = useState(true);
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);

  const bootstrapHandler = () => {
    const suffledHiragana = suffleHiragana();
    setImageName(suffledHiragana.pop());
    setSuffle([...suffledHiragana]);
    setAnswer("");
    setHidden(true);
    setNextButtonIsDisabled(true);
  };

  const showHint = () => {
    setHidden(false);
  };

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
    setImageName(suffle.pop());
    setSuffle([...suffle]);
    setHidden(true);

    setNextButtonIsDisabled(true);
    setAnswer("");
    inputRef.current.focus();
  };

  const sanatizeImageName = (imageName) => {
    if (imageName === 'ZU2' || imageName === 'JI2') {
      return imageName.slice(0,2)
    }
    return imageName;
  }

  const checkAnswer = (e) => {
    setAnswer(e.target.value.toUpperCase());
    if (e.target.value.toUpperCase() === sanatizeImageName(imageName.toUpperCase())) {
      setNextButtonIsDisabled(false);
    } else {
      setNextButtonIsDisabled(true);
    }
  };

  const onKeyPressed = (e) => {
    const enterKey = e.keyCode == 13
    const shiftKey = e.keyCode == 16
    if (enterKey && !nextButtonIsDisabled) {
      nextLetter()
    } else if (enterKey && nextButtonIsDisabled) {
      setAnswer("");
      inputRef.current.focus();
    } else if (shiftKey) {
      showHint();
    }

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
      {suffle.length !== 0 ?
        <>
          <div className="token">
            <img src={`${route}${imageName}.png`} alt="" />
            <small className={hidden ? "hidden" : ""}>
              {sanatizeImageName(imageName.toUpperCase())}
            </small>
          </div>
          <main className="actions">
            <Button text="REVELAR" handler={showHint} />
            <legend>Escribe letra en hiragana.</legend>
            <input
              ref={inputRef}
              autoFocus
              type="text"
              placeholder="Escribe tu respuesta aquí"
              value={answer}
              onChange={(e) => checkAnswer(e)}
              onKeyDown={(e) => onKeyPressed(e)}
            />
            <Button
              text="SIGUIENTE"
              secondary={true}
              handler={nextLetter}
              disabled={nextButtonIsDisabled}
              data-next-id="next"
              title="Tienes que adivinar o revelar la letra para avanzar."
            />
          </main>
        </> : 
        <span> Has completado todas las letras, empieza de nuevo apretando 'Reset' </span>
      }
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
