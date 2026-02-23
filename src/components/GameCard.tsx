import { Link } from "react-router-dom";
import type { GameInfo } from "../types";
import { DIFFICULTY_LABELS, DIFFICULTY_BADGES } from "../data/games";
import "./GameCard.css";

interface GameCardProps {
  game: GameInfo;
}

export function GameCard({ game }: GameCardProps) {
  const difficultyLabel = DIFFICULTY_LABELS[game.difficulty];
  const badge = DIFFICULTY_BADGES[game.difficulty];

  return (
    <Link to={`/game/${game.id}`} className="game-card">
      <div className="game-card-header">
        <span className="game-card-badge">{badge} {difficultyLabel}</span>
        <span className="game-card-icon">{game.icon}</span>
      </div>
      <h3 className="game-card-title">{game.name}</h3>
      <p className="game-card-desc">{game.description}</p>
      <span className="game-card-cta">プレイ →</span>
    </Link>
  );
}
