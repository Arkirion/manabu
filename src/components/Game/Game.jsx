import React, { useRef } from "react";
import "./_Game.sass";

import Button from "../Button/Button";
import FinalMessage from "../FinalMessage/FinalMessage";

import { hiragana } from "../../common/utils/maps";
import { hideElement } from "../../common/utils/utils";

import { useSuffle } from "../../common/hooks/useSuffle";
import { useAnswer, EMPTY, GAME_MODES } from "../../common/hooks/useAnswer";

import TokenCard from "../TokenCard/TokenCard";
import HeaderCard from "../HeaderCard/HeaderCard";

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
    resetAllValues(gameMode);
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
        handleInputValue(EMPTY);
      }
      if (enterKey && correctAnswer) {
        resetAllValues(gameMode);
        handleNextLetter();
      }

      if (shiftKey) handleShowHint(true);
    }

    if (gameMode === GAME_MODES.hit) {
      if (enterKey && input !== EMPTY) {
        resetAllValues(gameMode);
        handleNextLetter();
      }
    }
    inputRef.current.focus();
  };

  return (
    <main className="game-container">
      <HeaderCard onChangeHandler={changeGameMode} gameMode={ gameMode } />
      {suffle.length !== 0 ? (
        <>
          <TokenCard name={imageName} gameMode={gameMode} showHint={showHint} />
          <section>
            <Button
              style={{ ...hideElement(gameMode === GAME_MODES.reveal) }}
              text="REVELAR"
              handler={() => handleShowHint(true)}
            />
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
        <FinalMessage gameMode={gameMode} counter={correctAnswerCounter} />
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
