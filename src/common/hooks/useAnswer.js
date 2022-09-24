import { useState, useEffect } from "react";
import { sanatizeImageName } from "../utils/utils";


export const useAnswer = () => {
  // const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [enableNextbutton, setEnableNextbutton] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0);
  // const [answer, setAnswer] = useState("");
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [gameMode, setGameMode] = useState('reveal');

  useEffect(() => {
    if (correctAnswer) {
      setEnableNextbutton(true)
      setCorrectAnswerCounter(correctAnswerCounter + 1)
    } else {
      setEnableNextbutton(false)
    }
  }, [correctAnswer]);

  useEffect(() => {
    if (!enableNextbutton) {
      setCorrectAnswer(false)
    }

    if (gameMode === 'hit') {
      setEnableNextbutton(true)
    }
  }, [enableNextbutton]);

  const handleInputValue = (value) => setInput(value); 
  const handleEnableNextbutton = (state) => setEnableNextbutton(state); 
  const handleShowHint = (showHint) => setShowHint(showHint);
  const handleGameMode = (gameMode) => {
    setGameMode(gameMode)
    setCorrectAnswerCounter(0)
  }

  const checkAnswer = (e, answerToCheck) => {
    const name = e.target.value.toUpperCase();
    handleInputValue(name)
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
    checkAnswer,
    handleInputValue,
    handleEnableNextbutton,
    handleShowHint,
    handleGameMode,
  };
};