import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import "./_Game.sass";

import Button from "../Button/Button";

import { hiragana } from "../../common/utils/maps";
import { sanatizeImageName } from "../../common/utils/utils";
import { hiraganaImageRoute } from "../../common/utils/constants";
import { hiddingVariants } from "../../common/utils/animations";

import { useSuffle } from "../../common/hooks/useSuffle";
import { useAnswer, EMPTY, GAME_MODES } from "../../common/hooks/useAnswer";

function Game() {
  const { suffle, imageName, suffleFromScratch, nextLetter } = useSuffle();
  
  const {
    input,
    gameMode,
    correctAnswer,
    enableNextbutton,
    correctAnswerCounter,
    showHint,
    resetAllValues,
    checkAnswer,
    handleInputValue,
    handleShowHint,
    handleGameMode,
  } = useAnswer();
  const inputRef = useRef(null);


  const changeGameMode = (e) => {
    const mode = e.target.value;
    handleGameMode(mode);
    suffleFromScratch();
  };

  const handleReset = () => {
    suffleFromScratch();
    resetAllValues(gameMode)
  };

  const handleNextLetter = () => {
    nextLetter(suffle);
    inputRef.current.focus();
  };

  const onKeyPressed = (e) => {
    const enterKey = e.keyCode == 13;
    const shiftKey = e.keyCode == 16;

    if (gameMode === GAME_MODES.reveal) {
      // we only need reset input to get better sensation
      if (enterKey && !correctAnswer) {
        // TODO: put on red when fail.
        handleInputValue('') 
      } 
      if (enterKey && correctAnswer) {
        resetAllValues(gameMode)
        handleNextLetter();
      }

      if (shiftKey) handleShowHint(true);
    }

    if (gameMode === GAME_MODES.hit) {
      if (enterKey && input !== '') {
        resetAllValues(gameMode)
        handleNextLetter();
      }
    }
    inputRef.current.focus();
  };

  return (
    <main className="game-container">
      <nav  onChange={changeGameMode} >
        <input type="radio" name="mode" value={GAME_MODES.reveal} checked={gameMode === GAME_MODES.reveal} readOnly/> Modo Revelar
        <input type="radio" name="mode" value={GAME_MODES.hit} checked={gameMode === GAME_MODES.hit} readOnly/> Modo Acertar
      </nav>
      <small>
        {" Intenta adivinar la letra! "}
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
              style={gameMode === GAME_MODES.reveal ? {visibility: 'visible'} : {visibility: 'hidden'}}
              variants={hiddingVariants}
              initial={{ opacity: 0 }}
              animate={!showHint ? "hidden" : "visible"}
            >
              {sanatizeImageName(imageName)}
            </motion.small>
          </div>
          <section>
              <Button style={gameMode === GAME_MODES.reveal ? {visibility: 'visible'} : {visibility: 'hidden'}} text="REVELAR" handler={() => handleShowHint(true)} />
            <legend>Escribe la letra en hiragana.</legend>
            <input
              ref={inputRef}
              autoFocus
              type="text"
              placeholder="Escribe tu respuesta aquí"
              value={input}
              onChange={(e) => checkAnswer(e, imageName)}
              onKeyDown={(e) => onKeyPressed(e)}
            />
            <Button
              text="SIGUIENTE"
              secondary={true}
              handler={handleNextLetter}
              disabled={!enableNextbutton}
              data-next-id="next"
              title="Tienes que adivinar o revelar la letra para avanzar."
            />
          </section>
        </>
      ) : (
        <span>
          {gameMode === 'reveal' ?
              "Has completado todas las letras, empieza de nuevo presionando 'Reset' " :
              `Has terminado! has acertado ${correctAnswerCounter} letras!, empieza de nuevo presionando "Reset"`
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
