import { useState } from "react";
import { sanatizeImageName } from "../utils/utils";


export const useAnswer = () => {
  // const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [enableNextbutton, setEnableNextbutton] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [gameMode, setGameMode] = useState('reveal');

  const resetAnswer = ({
    showHintValue = false,
    emptyAnswer = true,
  } ) => {
    setShowHint(showHintValue);
    if (emptyAnswer) {
      setAnswer("");
    }
    handleEnableNextbutton(false); // always false if reveal, always true if hit, fix semantic
  };

  const handleGameMode = (gameMode) => {
    // validate between reveal and hit
    setGameMode(gameMode)
  }

  const handleEnableNextbutton = (state = true) => {
    if (gameMode === 'reveal') {
      setEnableNextbutton(state)
    }

    if (gameMode === 'hit') {
      setEnableNextbutton(true) // always enabled
    }
  }

  const checkAnswer = (e, answerToCheck) => {
    const name = e.target.value.toUpperCase();
    setAnswer(name);
    const match = name === sanatizeImageName(answerToCheck);
    setCorrectAnswer(match);
    handleEnableNextbutton(match);
  };

  const handleShowHint = (show = true ) => {
    setShowHint(show)
  };

  return {
    correctAnswer,
    gameMode,
    enableNextbutton,
    showHint,
    handleGameMode,
    resetAnswer,
    checkAnswer,
    handleShowHint,
    handleEnableNextbutton
  };
};