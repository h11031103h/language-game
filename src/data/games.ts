import type { GameInfo } from "../types";

const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

export const GAME_DEFS = [
  {
    baseGameId: "summary" as const,
    name: "要約せよ",
    nameEn: "Summary Battle",
    description: "文章を読んで、制限字数で要約しよう",
    icon: null,
  },
  {
    baseGameId: "continue" as const,
    name: "続きを書け",
    nameEn: "Continue the Story",
    description: "物語の続きを、文体を合わせて書こう",
    icon: null,
  },
  {
    baseGameId: "maze" as const,
    name: "指示に従え",
    nameEn: "Instruction Maze",
    description: "複雑な指示を正しく読み取り、従えるか試す",
    icon: null,
  },
];

export const GAMES: GameInfo[] = GAME_DEFS.flatMap((def) =>
  DIFFICULTIES.map((difficulty) => ({
    ...def,
    id: `${def.baseGameId}-${difficulty}` as GameInfo["id"],
    baseGameId: def.baseGameId,
    difficulty,
  }))
);

export const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "ひろゆき級",
};

export const DIFFICULTY_OPTIONS = [
  { value: "beginner", label: "初級" },
  { value: "intermediate", label: "中級" },
  { value: "advanced", label: "ひろゆき級" },
] as const;

export const DIFFICULTY_BADGES: Record<string, string> = {
  beginner: "Lv.1",
  intermediate: "Lv.2",
  advanced: "Lv.3",
};
