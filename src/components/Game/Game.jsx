import React, { useState, useEffect, useRef } from "react";
import Button from "../Button/Button";
import "./_Game.sass";
import { hiragana } from "../../common/utils/maps";
import { suffleHiragana, sanatizeImageName } from "../../common/utils/utils";

function Game() {
  const route = "/assets/hiragana/"; // https://vitejs.dev/guide/assets.html#the-public-directory
  const [imageName, setImageName] = useState("a");
  const [suffle, setSuffle] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [nextButtonIsDisabled, setNextButtonIsDisabled] = useState(true);
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);

  // initial function to start from scratch.
  const bootstrapHandler = () => {
    const suffledHiragana = suffleHiragana();
    const nextElement = suffledHiragana.pop();
    setImageName(nextElement);
    nextLetter(suffledHiragana);
  };

  const handleNextLetter = () => {
    setImageName(suffle.pop());
    nextLetter(suffle);
    inputRef.current.focus();
  };

  // Process to prepare next letter (clean and hide)
  const nextLetter = (suffleToUpdate) => {
    setSuffle([...suffleToUpdate]);
    setHidden(true);
    setNextButtonIsDisabled(true);
    setAnswer("");
  };

  const checkAnswer = (e) => {
    const name = e.target.value.toUpperCase();
    setAnswer(name);
    const match = name === sanatizeImageName(imageName);
    return setNextButtonIsDisabled(!match);
  };

  const onKeyPressed = (e) => {
    const enterKey = e.keyCode == 13;
    const shiftKey = e.keyCode == 16;

    if (enterKey && nextButtonIsDisabled) setAnswer("");
    if (enterKey && !nextButtonIsDisabled) handleNextLetter();
    if (shiftKey) showHint();

    inputRef.current.focus();
  };

  const showHint = () => {
    setHidden(false);
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
      {suffle.length !== 0 ? (
        <>
          <div className="token">
            <img src={`${route}${imageName}.png`} alt="" />
            <small className={hidden ? "hidden" : ""}>
              {sanatizeImageName(imageName)}
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
              handler={handleNextLetter}
              disabled={nextButtonIsDisabled}
              data-next-id="next"
              title="Tienes que adivinar o revelar la letra para avanzar."
            />
          </main>
        </>
      ) : (
        <span>
          {" "}
          Has completado todas las letras, empieza de nuevo apretando 'Reset'{" "}
        </span>
      )}
      <footer>
        <Button
          text="RESET"
          secondary={true}
          handler={() => bootstrapHandler}
        />
        <span>
          {" "}
          {hiragana.length - suffle.length} / {hiragana.length}
        </span>
      </footer>
    </div>
  );
}

export default Game;
