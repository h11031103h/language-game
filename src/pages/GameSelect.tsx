import { GameCardSelect } from "../components/GameCardSelect";
import { GAME_DEFS } from "../data/games";
import "./GameSelect.css";

export function GameSelect() {
  return (
    <div className="game-select">
      <div className="game-select-hero">
        <h1 className="game-select-title">
          言語化・思考力・読解力
        </h1>
        <p className="game-select-subtitle">
          ゲームで鍛える。ひろゆき級を目指せ。
        </p>
      </div>

      <div className="game-select-cards">
        {GAME_DEFS.map((game) => (
          <GameCardSelect key={game.baseGameId} game={game} />
        ))}
      </div>
    </div>
  );
}
