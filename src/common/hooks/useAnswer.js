import { useState } from "react";
import { sanatizeImageName } from "../utils/utils";


export const useAnswer = () => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);

  const resetAnswer = ({
    showHintValue = false,
    emptyAnswer = true,
    correctAnswer = false,
  } ) => {
    console.log('nani?')
    // console.log(showHintValue)
    setShowHint(showHintValue);
    if (emptyAnswer) {
      setAnswer("");
    }
    setIsCorrectAnswer(correctAnswer);
  };

  // refactor to be more semantic and logic correct, so we should set an state called "isCorrectAnswer" and "enableNextbutton"
  const handleShowIsCorrectAnswer = (state = true) => {
    setIsCorrectAnswer(state)
  }

  const checkAnswer = (e, answerToCheck, gameMode = 'reveal') => {
    const name = e.target.value.toUpperCase();
    setAnswer(name);
    const match = name === sanatizeImageName(answerToCheck);
    return gameMode=== 'reveal' ? setIsCorrectAnswer(match): setIsCorrectAnswer(false);
  };

  const handleShowHint = (show = true ) => {
    setShowHint(show)
  };

  return {
    answer,
    isCorrectAnswer,
    showHint,
    resetAnswer,
    checkAnswer,
    handleShowHint,
    handleShowIsCorrectAnswer
  };
};