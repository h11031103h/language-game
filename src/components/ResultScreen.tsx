import type { GameResult } from "../types";
import "./ResultScreen.css";

interface ResultScreenProps {
  result: GameResult;
  isVersus?: boolean;
  opponentResult?: GameResult;
  onRetry?: () => void;
  onBack?: () => void;
}

export function ResultScreen({
  result,
  isVersus,
  opponentResult,
  onRetry,
  onBack,
}: ResultScreenProps) {
  const isWin = isVersus && opponentResult && result.score > opponentResult.score;
  const isDraw = isVersus && opponentResult && result.score === opponentResult.score;
  const isBWin = isVersus && opponentResult && result.score < opponentResult.score;

  return (
    <div className="result-screen">
      <h2 className="result-title">
        {isVersus
          ? isWin
            ? "Aの勝利！"
            : isDraw
              ? "引き分け"
              : isBWin
                ? "Bの勝利！"
                : "結果"
          : "結果"}
      </h2>

      <div className="result-scores">
        <div className="result-score-card main">
          <span className="result-label">{isVersus ? "A" : "あなた"}</span>
          <span className="result-value">{result.score}</span>
          <span className="result-max">/ {result.maxScore}点</span>
        </div>
        {isVersus && opponentResult && (
          <>
            <span className="result-vs">vs</span>
            <div className="result-score-card">
              <span className="result-label">B</span>
              <span className="result-value">{opponentResult.score}</span>
              <span className="result-max">/ {opponentResult.maxScore}点</span>
            </div>
          </>
        )}
      </div>

      {result.details && result.details.length > 0 && (
        <div className="result-details">
          {result.details.map((d, i) => (
            <div key={i} className="result-detail-row">
              <span>{d.label}</span>
              <span>{d.points}点</span>
            </div>
          ))}
        </div>
      )}

      {result.feedback && (
        <div className="result-feedback">
          {result.feedback.goodPoints.length > 0 && (
            <div className="result-feedback-section good">
              <h4 className="result-feedback-title">いい点</h4>
              <ul>
                {result.feedback.goodPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
          {result.feedback.badPoints.length > 0 && (
            <div className="result-feedback-section bad">
              <h4 className="result-feedback-title">悪い点</h4>
              <ul>
                {result.feedback.badPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="result-actions">
        {onRetry && (
          <button className="result-btn primary" onClick={onRetry}>
            もう一度
          </button>
        )}
        {onBack && (
          <button className="result-btn" onClick={onBack}>
            ゲーム選択に戻る
          </button>
        )}
      </div>
    </div>
  );
}
