import React, { useRef } from "react";
import { motion } from "framer-motion";
import "./_Game.sass";

import Button from "../Button/Button";

import { hiragana } from "../../common/utils/maps";
import { sanatizeImageName } from "../../common/utils/utils";
import { hiraganaImageRoute } from "../../common/utils/constants";
import { hiddingVariants } from "../../common/utils/animations";

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
            <motion.img
              src={`${hiraganaImageRoute}${imageName}.png`}
              key={suffle} // add key to re-render and trigger animation
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
              transition={{ delay: 0.01 }}
            />
            <motion.small
              variants={hiddingVariants}
              initial={{ opacity: 0 }}
              animate={!showHint ? "hidden" : "visible"}
            >
              {sanatizeImageName(imageName)}
            </motion.small>
          </div>
          <section>
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
