import React, { useRef } from "react";
import "./_Game.sass";
// components
import Button from "../Button/Button";

// utils
import { hiragana } from "../../common/utils/maps";
import { sanatizeImageName } from "../../common/utils/utils";
import { hiraganaImageRoute } from "../../common/utils/constants";

// custom hooks
import { useSuffle } from "../../common/hooks/useSuffle";
import { useAnswer } from "../../common/hooks/useAnswer";

function Game() {
  // const route = `${baseURL}/assets/hiragana/`; // https://vitejs.dev/guide/assets.html#the-public-directory
  const { suffle, imageName, suffleFromScratch, nextLetter } = useSuffle();
  const {
    answer,
    isCorrectAnswer,
    showHint,
    resetAnswer,
    checkAnswer,
    handleShowHint,
  } = useAnswer();
  const inputRef = useRef(null);

  const handleReset = () => {
    suffleFromScratch();
    resetAnswer();
  };

  const handleNextLetter = () => {
    nextLetter(suffle);
    inputRef.current.focus();
    resetAnswer();
  };

  const onKeyPressed = (e) => {
    const enterKey = e.keyCode == 13;
    const shiftKey = e.keyCode == 16;

    if (enterKey && !isCorrectAnswer) resetAnswer(false);
    if (enterKey && isCorrectAnswer) handleNextLetter();
    if (shiftKey) handleShowHint();

    inputRef.current.focus();
  };

  return (
    <main className="game-container">
      <small>
        {" Escribe el nombre de la letra en hiragana e intenta adivinar ! "}
      </small>
      {suffle.length !== 0 ? (
        <>
          <div className="token">
            <img src={`${hiraganaImageRoute}${imageName}.png`} alt="" />
            <small className={showHint ? "" : "hidden"}>
              {sanatizeImageName(imageName)}
            </small>
          </div>
          <section className="actions">
            <Button text="REVELAR" handler={() => handleShowHint()} />
            <legend>Escribe letra en hiragana.</legend>
            <input
              ref={inputRef}
              autoFocus
              type="text"
              placeholder="Escribe tu respuesta aquí"
              value={answer}
              onChange={(e) => checkAnswer(e, imageName)}
              onKeyDown={(e) => onKeyPressed(e)}
            />
            <Button
              text="SIGUIENTE"
              secondary={true}
              handler={handleNextLetter}
              disabled={!isCorrectAnswer}
              data-next-id="next"
              title="Tienes que adivinar o revelar la letra para avanzar."
            />
          </section>
        </>
      ) : (
        <span>
          {
            " Has completado todas las letras, empieza de nuevo apretando 'Reset' "
          }
        </span>
      )}
      <footer>
        <Button text="RESET" secondary={true} handler={() => handleReset()} />
        <span>
          {" "}
          {hiragana.length - suffle.length} / {hiragana.length}
        </span>
      </footer>
    </main>
  );
}

export default Game;
