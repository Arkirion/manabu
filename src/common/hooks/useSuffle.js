import { useState, useEffect } from "react";
import { suffleHiragana } from "../utils/utils";

export const useSuffle = () => {
  const [imageName, setImageName] = useState("");
  const [suffle, setSuffle] = useState([]);

  const suffleFromScratch = () => {
    const suffledHiragana = suffleHiragana();
    nextLetter(suffledHiragana);
  };

  // Process to prepare next letter
  const nextLetter = (suffleToUpdate) => {
    const nextElement = suffleToUpdate.pop();
    setImageName(nextElement);
    setSuffle([...suffleToUpdate]);
  };

  useEffect(() => {
    suffleFromScratch();
  }, []);

  return {
    suffle,
    imageName,
    suffleFromScratch,
    nextLetter,
  };
};