import { useState } from "react";
import { scoreSummary } from "../../utils/scoring";
import type { GameMode, GameResult, Difficulty } from "../../types";
import type { SummaryChallenge } from "../../types";
import "./SummaryBattle.css";

interface SummaryBattleProps {
  mode: GameMode;
  challenge: SummaryChallenge;
  difficulty: Difficulty;
  onComplete: (result: GameResult, resultB?: GameResult) => void;
  onChangeProblem?: () => void;
}

export function SummaryBattle({ mode, challenge, onComplete, onChangeProblem }: SummaryBattleProps) {
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");

  const handleSubmit = () => {
    if (mode === "versus") {
      const resultA = scoreSummary(
        answerA,
        challenge.referencePoints,
        challenge.wordLimit,
        challenge.difficulty
      );
      const resultB = scoreSummary(
        answerB,
        challenge.referencePoints,
        challenge.wordLimit,
        challenge.difficulty
      );
      onComplete(resultA, resultB);
    } else {
      const result = scoreSummary(
        answerA,
        challenge.referencePoints,
        challenge.wordLimit,
        challenge.difficulty
      );
      onComplete(result);
    }
  };

  const canSubmit = mode === "versus"
    ? answerA.trim().length > 0 && answerB.trim().length > 0
    : answerA.trim().length > 0;

  return (
    <div className="summary-battle">
      <div className="summary-battle-instruction">
        <p>以下の文章を <strong>{challenge.wordLimit}字以内</strong> で要約してください。</p>
      </div>

      <div className="summary-battle-text">
        {challenge.text}
      </div>

      <div className={`summary-battle-inputs ${mode === "versus" ? "versus" : ""}`}>
        {mode === "versus" ? (
          <>
            <div className="summary-battle-input-area">
              <label className="summary-battle-input-label">Aの入力</label>
              <textarea
                className="summary-battle-textarea"
                value={answerA}
                onChange={(e) => setAnswerA(e.target.value)}
                placeholder="Aの要約を入力..."
                maxLength={challenge.wordLimit * 2}
                rows={3}
              />
              <span className="summary-battle-count">{answerA.length} / {challenge.wordLimit}字</span>
            </div>
            <div className="summary-battle-input-area">
              <label className="summary-battle-input-label">Bの入力</label>
              <textarea
                className="summary-battle-textarea"
                value={answerB}
                onChange={(e) => setAnswerB(e.target.value)}
                placeholder="Bの要約を入力..."
                maxLength={challenge.wordLimit * 2}
                rows={3}
              />
              <span className="summary-battle-count">{answerB.length} / {challenge.wordLimit}字</span>
            </div>
          </>
        ) : (
          <div className="summary-battle-input-area">
            <textarea
              className="summary-battle-textarea"
              value={answerA}
              onChange={(e) => setAnswerA(e.target.value)}
              placeholder="要約を入力..."
              maxLength={challenge.wordLimit * 2}
              rows={4}
            />
            <span className="summary-battle-count">{answerA.length} / {challenge.wordLimit}字</span>
          </div>
        )}
      </div>

      <button
        className="summary-battle-submit"
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        採点する
      </button>
      {onChangeProblem && (
        <button className="summary-battle-change-problem" onClick={onChangeProblem}>
          別の問題
        </button>
      )}
    </div>
  );
}
