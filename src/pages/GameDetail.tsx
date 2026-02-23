import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GAMES, DIFFICULTY_LABELS, DIFFICULTY_BADGES } from "../data/games";
import { ModeSelector } from "../components/ModeSelector";
import { ResultScreen } from "../components/ResultScreen";
import { SummaryBattle } from "../components/games/SummaryBattle";
import { ContinueStory } from "../components/games/ContinueStory";
import { InstructionMaze } from "../components/games/InstructionMaze";
import { useUsedChallenges } from "../hooks/useUsedChallenges";
import { SUMMARY_CHALLENGES } from "../data/summaryChallenges";
import { STORY_CHALLENGES } from "../data/storyChallenges";
import { INSTRUCTION_CHALLENGES } from "../data/mazeChallenges";
import type { GameMode, GameResult, BaseGameId, Difficulty } from "../types";
import "./GameDetail.css";

function parseGameId(gameId: string): { baseGameId: BaseGameId; difficulty: Difficulty } | null {
  const match = gameId?.match(/^(summary|continue|maze)-(beginner|intermediate|advanced)$/);
  if (!match) return null;
  return { baseGameId: match[1] as BaseGameId, difficulty: match[2] as Difficulty };
}

export function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [mode, setMode] = useState<GameMode>("single");
  const [myResult, setMyResult] = useState<GameResult | null>(null);
  const [opponentResult, setOpponentResult] = useState<GameResult | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const { pickExcluding } = useUsedChallenges();

  const parsed = gameId ? parseGameId(gameId) : null;
  const baseGameId = parsed?.baseGameId ?? "summary";
  const difficulty = parsed?.difficulty ?? "beginner";

  const summaryChallenge = useMemo(() => {
    if (baseGameId !== "summary") return null;
    const pool = SUMMARY_CHALLENGES.filter((c) => c.difficulty === difficulty);
    return pickExcluding(pool);
  }, [gameId, baseGameId, difficulty, retryKey]);

  const continueChallenge = useMemo(() => {
    if (baseGameId !== "continue") return null;
    const pool = STORY_CHALLENGES.filter((c) => c.difficulty === difficulty);
    return pickExcluding(pool);
  }, [gameId, baseGameId, difficulty, retryKey]);

  const mazeChallenge = useMemo(() => {
    if (baseGameId !== "maze") return null;
    const pool = INSTRUCTION_CHALLENGES.filter((c) => c.difficulty === difficulty);
    return pickExcluding(pool);
  }, [gameId, baseGameId, difficulty, retryKey]);

  const game = GAMES.find((g) => g.id === gameId);
  const hasChallenge = baseGameId === "summary" ? summaryChallenge : baseGameId === "continue" ? continueChallenge : mazeChallenge;
  if (!game || !parsed || !hasChallenge) {
    return (
      <div className="game-detail">
        <p>ゲームが見つかりません</p>
        <Link to="/">戻る</Link>
      </div>
    );
  }

  const badge = DIFFICULTY_BADGES[game.difficulty];
  const difficultyLabel = DIFFICULTY_LABELS[game.difficulty];

  const handleComplete = (result: GameResult, resultB?: GameResult) => {
    setMyResult(result);
    if (mode === "versus" && resultB) {
      setOpponentResult(resultB);
    }
  };

  const handleBack = () => navigate("/");
  const handleRetry = () => {
    setMyResult(null);
    setOpponentResult(null);
    setRetryKey((k) => k + 1);
  };
  const handleChangeProblem = () => setRetryKey((k) => k + 1);

  const isVersusComplete = mode === "versus" && myResult && opponentResult;

  if (isVersusComplete) {
    return (
      <div className="game-detail">
        <Link to="/" className="back-link">← ゲーム選択に戻る</Link>
        <ResultScreen
          result={myResult}
          isVersus
          opponentResult={opponentResult}
          onBack={handleBack}
        />
      </div>
    );
  }

  if (mode === "single" && myResult) {
    return (
      <div className="game-detail">
        <Link to="/" className="back-link">← ゲーム選択に戻る</Link>
        <ResultScreen
          result={myResult}
          onRetry={handleRetry}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="game-detail">
      <Link to="/" className="back-link">← ゲーム選択に戻る</Link>
      <div className="game-detail-header">
        <span className="game-detail-badge">{badge} {difficultyLabel}</span>
        <h1 className="game-detail-title">{game.icon ? `${game.icon} ` : ""}{game.name}</h1>
        <p className="game-detail-desc">{game.description}</p>
      </div>
      <ModeSelector mode={mode} onModeChange={setMode} />
      {baseGameId === "summary" && summaryChallenge && (
        <SummaryBattle key={retryKey} mode={mode} challenge={summaryChallenge} difficulty={difficulty} onComplete={handleComplete} onChangeProblem={handleChangeProblem} />
      )}
      {baseGameId === "continue" && continueChallenge && (
        <ContinueStory key={retryKey} mode={mode} challenge={continueChallenge} difficulty={difficulty} onComplete={handleComplete} onChangeProblem={handleChangeProblem} />
      )}
      {baseGameId === "maze" && mazeChallenge && (
        <InstructionMaze key={retryKey} mode={mode} challenge={mazeChallenge} difficulty={difficulty} onComplete={handleComplete} onChangeProblem={handleChangeProblem} />
      )}
    </div>
  );
}
