import './_FinalMessage.sass'

function FinalMessage({ gameMode = 'reveal', counter }) {
  console.log(counter)
  return (
    <span class='final-message'>
      {gameMode === "reveal"
        ? "Has completado todas las letras, empieza de nuevo presionando 'Reset' "
        : `Has terminado! has acertado ${counter} letras!, empieza de nuevo presionando "Reset"`}
    </span>
  );
}

export default FinalMessage;
