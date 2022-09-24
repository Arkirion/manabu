import { useState, useEffect } from "react";
import { sanatizeImageName } from "../utils/utils";

export const EMPTY = "";
export const GAME_MODES = {
  reveal: "reveal",
  hit: "hit",
};

export const useAnswer = () => {
  const [enableNextbutton, setEnableNextbutton] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0);
  const [input, setInput] = useState(EMPTY);
  const [showHint, setShowHint] = useState(false);
  const [gameMode, setGameMode] = useState(GAME_MODES.reveal);

  useEffect(() => {
    if (correctAnswer) {
      setEnableNextbutton(true);
      setCorrectAnswerCounter(correctAnswerCounter + 1);
    } else {
      setEnableNextbutton(false);
    }
  }, [correctAnswer]);

  useEffect(() => {
    if (!enableNextbutton) {
      setCorrectAnswer(false);
    }

    if (gameMode === GAME_MODES.hit) {
      setEnableNextbutton(true);
    }
  }, [enableNextbutton]);

  // TODO : try to remove gameMode?
  const resetAllValues = (gameMode) => {
    handleInputValue(EMPTY);
    handleShowHint(false);

    if (gameMode === GAME_MODES.reveal)  handleEnableNextbutton(false);
    if (gameMode === GAME_MODES.hit) handleEnableNextbutton(true);
  };

  const handleInputValue = (value) => setInput(value);
  const handleEnableNextbutton = (state) => setEnableNextbutton(state);
  const handleShowHint = (showHint) => setShowHint(showHint);
  const handleGameMode = (gameMode) => {
    setGameMode(gameMode);
    setCorrectAnswerCounter(0);
    resetAllValues(gameMode);
  };

  const checkAnswer = (e, answerToCheck) => {
    const name = e.target.value.toUpperCase();
    handleInputValue(name);
    const match = name === sanatizeImageName(answerToCheck);
    setCorrectAnswer(match);
  };

  return {
    input,
    gameMode,
    correctAnswer,
    enableNextbutton,
    showHint,
    correctAnswerCounter,
    resetAllValues,
    checkAnswer,
    handleInputValue,
    handleShowHint,
    handleGameMode,
  };
};
