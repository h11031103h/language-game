import type { GameMode } from "../types";
import "./ModeSelector.css";

interface ModeSelectorProps {
  mode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="mode-selector">
      <h3 className="mode-selector-title">モード選択</h3>
      <div className="mode-options">
        <button
          className={`mode-btn ${mode === "single" ? "active" : ""}`}
          onClick={() => onModeChange("single")}
        >
          <span className="mode-btn-label">シングル</span>
          <span className="mode-btn-desc">一人で練習</span>
        </button>
        <button
          className={`mode-btn ${mode === "versus" ? "active" : ""}`}
          onClick={() => onModeChange("versus")}
        >
          <span className="mode-btn-label">AB対戦</span>
          <span className="mode-btn-desc">同じ画面でA・Bが入力</span>
        </button>
      </div>
    </div>
  );
}
