import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BaseGameId, Difficulty } from "../types";
import { DIFFICULTY_OPTIONS } from "../data/games";
import "./GameCardSelect.css";

interface GameDef {
  baseGameId: BaseGameId;
  name: string;
  description: string;
  icon: string | null;
}

interface GameCardSelectProps {
  game: GameDef;
}

export function GameCardSelect({ game }: GameCardSelectProps) {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner");

  const handleStart = () => {
    navigate(`/game/${game.baseGameId}-${difficulty}`);
  };

  return (
    <div className="game-card-select">
      <div className="game-card-select-header">
        <h3 className="game-card-select-title">{game.name}</h3>
      </div>
      <p className="game-card-select-desc">{game.description}</p>

      <div className="game-card-select-difficulty">
        <label className="game-card-select-label">難易度</label>
        <select
          className="game-card-select-dropdown"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        >
          {DIFFICULTY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button className="game-card-select-btn" onClick={handleStart}>
        挑戦する
      </button>
    </div>
  );
}
