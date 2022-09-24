import React from "react";
import './_Button.sass';

export default function Button({ text, secondary = false, handler, disabled = false, title = '', style = {} }) {
  const secondaryClass = secondary ? '--secondary' : ''; 
  const disableClass = disabled ? 'disabled': ''
  return <button className={`button${secondaryClass} ${disableClass}`} title={title} onClick={handler} disabled={disabled} style={style} >
    {text}
  </button>;
}
