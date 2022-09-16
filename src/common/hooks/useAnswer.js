import { useState } from "react";
import { sanatizeImageName } from "../utils/utils";


export const useAnswer = () => {
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);

  const resetAnswer = (showHint = false) => {
    setShowHint(showHint);
    setAnswer("");
    setIsCorrectAnswer(false);
  };

  const checkAnswer = (e, answerToCheck) => {
    const name = e.target.value.toUpperCase();
    setAnswer(name);
    const match = name === sanatizeImageName(answerToCheck);
    return setIsCorrectAnswer(match);
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
  };
};