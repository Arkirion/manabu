import React, { useRef, useState } from "react";
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
  const { suffle, imageName, suffleFromScratch, nextLetter } = useSuffle();
  // const [gameMode, setGameMode] = useState('reveal');


  const {
    answer,
    gameMode,
    enableNextbutton,
    showHint,
    handleGameMode,
    resetAnswer,
    checkAnswer,
    handleShowHint,
    handleEnableNextbutton
  } = useAnswer();
  const inputRef = useRef(null);


  const changeGameMode = (e) => {
    const mode = e.target.value;
    handleGameMode(mode);
    suffleFromScratch();

    // esto podria ir dentro del useAnswer?????
    if (mode === 'hit') {
      // handleEnableNextbutton(true)
      resetAnswer({})
      handleEnableNextbutton(true)
    } 
    console.log(mode);

    if (mode === 'reveal') {
      console.log(2, mode);

      handleEnableNextbutton(false)
    } 
  };


  const handleReset = () => {
    suffleFromScratch();
    resetAnswer({});
  };

  const handleNextLetter = () => {
    nextLetter(suffle);
    inputRef.current.focus();

    resetAnswer({});
  };

  const onKeyPressed = (e) => {
    const enterKey = e.keyCode == 13;
    const shiftKey = e.keyCode == 16;

    // esto creo NO puede ir dentro del useAnswer
    if (gameMode === 'reveal') {
      if (enterKey && !enableNextbutton) resetAnswer({});
      if (enterKey && enableNextbutton) handleNextLetter();
      if (shiftKey) handleShowHint();
    }

    if (gameMode === 'hit') {
      if (enterKey) {
        handleNextLetter();
      }
      handleEnableNextbutton()
    }


    inputRef.current.focus();
  };

  return (
    <main className="game-container">
      <nav  onChange={changeGameMode} >
        <input type="radio" name="mode" value="reveal" checked={gameMode === 'reveal'} readOnly/> Modo Revelar
        {/* <label htmlFor="revealMode">Modo Revelar</label> */}
        <input type="radio" name="mode" value="hit" checked={gameMode === 'hit'} readOnly/> Modo Acerta
        {/* <label htmlFor="hitMode">Modo Acertar</label> */}
      </nav>
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
            {gameMode === 'reveal' &&
              <motion.small
                variants={hiddingVariants}
                initial={{ opacity: 0 }}
                animate={!showHint ? "hidden" : "visible"}
              >
                {sanatizeImageName(imageName)}
              </motion.small>
            }
          </div>
          <section>
            { gameMode === 'reveal' &&
              <Button text="REVELAR" handler={() => handleShowHint()} />
            }
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
              disabled={!enableNextbutton}
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
