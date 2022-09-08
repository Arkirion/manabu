import React from "react";
import './_Button.sass';

export default function Button({ text, secondary = false, handler }) {
  const secondaryClass = secondary ? '--secondary' : ''; 
  return <button className={`button${secondaryClass}`} onClick={handler}>
    {text}
  </button>;
}
