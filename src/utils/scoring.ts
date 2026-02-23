import type { GameResult } from "../types";
import type { Difficulty } from "../types";

/**
 * 要約バトルの採点
 * ひろゆき級: 辛口採点 + レビュー
 */
export function scoreSummary(
  answer: string,
  referencePoints: string[],
  wordLimit: number,
  difficulty: Difficulty = "beginner"
): GameResult {
  const goodPoints: string[] = [];
  const badPoints: string[] = [];

  let keywordScore = Math.min(
    60,
    referencePoints.filter((kw) => answer.includes(kw)).length * 20
  );
  const usedKeywords = referencePoints.filter((kw) => answer.includes(kw));
  const missingKeywords = referencePoints.filter((kw) => !answer.includes(kw));

  let lengthScore = 0;
  const len = answer.length;
  const idealMin = wordLimit * 0.5;
  const idealMax = wordLimit * 1.2;
  if (len >= idealMin && len <= idealMax) {
    lengthScore = 40;
  } else if (len > 0 && len < wordLimit * 2) {
    lengthScore = Math.max(0, 40 - Math.abs(len - wordLimit) * 0.5);
  }

  // ひろゆき級: 辛口採点
  if (difficulty === "advanced") {
    keywordScore *= 0.9;
    lengthScore *= 0.9;
    if (missingKeywords.length > 0) {
      badPoints.push(`「${missingKeywords.join("」「")}」が抜けている。論点の取りこぼしがある。`);
    }
    if (usedKeywords.length >= referencePoints.length) {
      goodPoints.push("主要な論点は押さえられている。");
    }
    if (len > wordLimit * 1.2) {
      badPoints.push("冗長。制限字数を守れ。無駄な修飾は削れ。");
    } else if (len < wordLimit * 0.5 && len > 0) {
      badPoints.push("短すぎる。本質を伝えるには情報が足りない。");
    } else if (len >= idealMin && len <= idealMax) {
      goodPoints.push("簡潔さは合格ライン。");
    }
    if (answer.length < 20) {
      badPoints.push("これでは要約とは言えない。読み直して出直してこい。");
    }
    if (goodPoints.length === 0 && badPoints.length > 0) {
      goodPoints.push("...少なくとも挑戦はした。");
    }
  }

  const total = Math.min(100, Math.round(keywordScore + lengthScore));
  const details = [
    { label: "要点の網羅", points: Math.round(keywordScore) },
    { label: "簡潔さ", points: Math.round(lengthScore) },
  ];

  return {
    score: total,
    maxScore: 100,
    details,
    answer,
    feedback: difficulty === "advanced" ? { goodPoints, badPoints } : undefined,
  };
}

/**
 * 続きを書けの採点
 * ひろゆき級: 辛口採点 + レビュー
 */
export function scoreContinue(
  answer: string,
  referencePoints: string[],
  _wordLimit: number,
  difficulty: Difficulty = "beginner"
): GameResult {
  const goodPoints: string[] = [];
  const badPoints: string[] = [];

  const hasContent = answer.length >= 20;
  let contentScore = hasContent ? 50 : Math.min(50, answer.length * 2);
  const usedKeywords = referencePoints.filter((kw) => answer.includes(kw));
  let keywordScore = (usedKeywords.length / referencePoints.length) * 50;

  if (difficulty === "advanced") {
    contentScore *= 0.85;
    keywordScore *= 0.9;
    if (answer.length < 50) {
      badPoints.push("展開が薄い。導入の論理を発展させているか？");
    }
    if (usedKeywords.length < referencePoints.length) {
      badPoints.push(`テーマ（${referencePoints.filter((k) => !answer.includes(k)).join("、")}）が続きに活かされていない。`);
    }
    if (answer.includes("〜") || answer.includes("...")) {
      badPoints.push("曖昧な表現でごまかすな。言い切りで書け。");
    }
    if (hasContent && usedKeywords.length >= referencePoints.length * 0.5) {
      goodPoints.push("導入の文脈は受け継いでいる。");
    }
    if (answer.length >= 80) {
      goodPoints.push("分量は十分。");
    }
    if (goodPoints.length === 0 && badPoints.length > 0) {
      goodPoints.push("...文体の真似はできている。中身を鍛えろ。");
    }
  }

  const total = Math.min(100, Math.round(contentScore + keywordScore));
  const details = [
    { label: "物語の展開", points: Math.round(contentScore) },
    { label: "テーマの継続", points: Math.round(keywordScore) },
  ];

  return {
    score: total,
    maxScore: 100,
    details,
    answer,
    feedback: difficulty === "advanced" ? { goodPoints, badPoints } : undefined,
  };
}

/**
 * 指示の迷宮の採点（未使用・互換用）
 */
export function scoreMaze(
  moveCount: number,
  success: boolean,
  _maxMoves: number = 20
): GameResult {
  if (!success) {
    return {
      score: 0,
      maxScore: 100,
      details: [{ label: "ゴール未到達", points: 0 }],
    };
  }
  const efficiency = Math.max(0, 100 - moveCount * 5);
  return {
    score: Math.min(100, efficiency),
    maxScore: 100,
    details: [
      { label: "ゴール到達", points: 50 },
      { label: "効率性", points: Math.min(50, Math.max(0, 50 - moveCount * 2)) },
    ],
    answer: `${moveCount}手でゴール`,
  };
}
