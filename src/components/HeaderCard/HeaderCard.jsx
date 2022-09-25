import { GAME_MODES } from "../../common/hooks/useAnswer";
import './_HeaderCard.sass'

function HeaderCard({ gameMode, onChangeHandler }) {
  return (
    <header className="header-card">
      <nav onChange={onChangeHandler}>
        <input
          type="radio"
          name="mode"
          value={GAME_MODES.reveal}
          checked={gameMode === GAME_MODES.reveal}
          readOnly
        />
        {" Modo Revelar "}
        <input
          type="radio"
          name="mode"
          value={GAME_MODES.hit}
          checked={gameMode === GAME_MODES.hit}
          readOnly
        />
        {" Modo Acertar "}
      </nav>
      <small>{" Intenta adivinar la letra! "}</small>
    </header>
  );
}

export default HeaderCard;
