import { useState } from "react";
import { scoreContinue } from "../../utils/scoring";
import type { GameMode, GameResult, Difficulty } from "../../types";
import type { ContinueChallenge } from "../../types";
import "./ContinueStory.css";

interface ContinueStoryProps {
  mode: GameMode;
  challenge: ContinueChallenge;
  difficulty: Difficulty;
  onComplete: (result: GameResult, resultB?: GameResult) => void;
  onChangeProblem?: () => void;
}

export function ContinueStory({ mode, challenge, onComplete, onChangeProblem }: ContinueStoryProps) {
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");

  const handleSubmit = () => {
    if (mode === "versus") {
      const resultA = scoreContinue(
        answerA,
        challenge.referencePoints,
        challenge.wordLimit,
        challenge.difficulty
      );
      const resultB = scoreContinue(
        answerB,
        challenge.referencePoints,
        challenge.wordLimit,
        challenge.difficulty
      );
      onComplete(resultA, resultB);
    } else {
      const result = scoreContinue(
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
    <div className="continue-story">
      <div className="continue-story-instruction">
        <p>以下の導入文の続きを <strong>{challenge.wordLimit}字程度</strong> で書いてください。文体を合わせてください。</p>
      </div>

      <div className="continue-story-intro">
        {challenge.intro}
      </div>

      <div className={`continue-story-inputs ${mode === "versus" ? "versus" : ""}`}>
        {mode === "versus" ? (
          <>
            <div className="continue-story-input-area">
              <label className="continue-story-input-label">Aの入力</label>
              <textarea
                className="continue-story-textarea"
                value={answerA}
                onChange={(e) => setAnswerA(e.target.value)}
                placeholder="Aの続きを入力..."
                maxLength={challenge.wordLimit * 2}
                rows={3}
              />
              <span className="continue-story-count">{answerA.length}字</span>
            </div>
            <div className="continue-story-input-area">
              <label className="continue-story-input-label">Bの入力</label>
              <textarea
                className="continue-story-textarea"
                value={answerB}
                onChange={(e) => setAnswerB(e.target.value)}
                placeholder="Bの続きを入力..."
                maxLength={challenge.wordLimit * 2}
                rows={3}
              />
              <span className="continue-story-count">{answerB.length}字</span>
            </div>
          </>
        ) : (
          <div className="continue-story-input-area">
            <textarea
              className="continue-story-textarea"
              value={answerA}
              onChange={(e) => setAnswerA(e.target.value)}
              placeholder="続きを書いてください..."
              maxLength={challenge.wordLimit * 2}
              rows={4}
            />
            <span className="continue-story-count">{answerA.length}字</span>
          </div>
        )}
      </div>

      <button
        className="continue-story-submit"
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        採点する
      </button>
      {onChangeProblem && (
        <button className="continue-story-change-problem" onClick={onChangeProblem}>
          別の問題
        </button>
      )}
    </div>
  );
}
