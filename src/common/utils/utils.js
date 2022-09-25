import { hiragana } from "../../common/utils/maps";


export const suffleHiragana = () => {
  const hiraganaSuffled = [];
  const hiraganaCopy = [...hiragana];
  const arrayIndex = 0;

  for (let index = 0; index < hiragana.length; index++) {
    const random = Math.floor(Math.random() * hiraganaCopy.length);
    const ruffle = hiraganaCopy.splice(random, 1)[arrayIndex];
    hiraganaSuffled.push(ruffle);
  }

  return hiraganaSuffled;
};

export const sanatizeImageName = (imageName) => {
  let letterName = imageName.toUpperCase()
  if (letterName === 'ZU2' || letterName === 'JI2') {
    return letterName.slice(0,2)
  }
  return letterName;
}

export const hideElement = (condition) => {
  return condition ? { visibility: "visible" } : { visibility: "hidden" };
};