export type Difficulty = "beginner" | "intermediate" | "advanced";

export type BaseGameId = "summary" | "continue" | "maze";

export type GameId = `${BaseGameId}-${Difficulty}`;

export type GameMode = "single" | "versus";

export interface GameInfo {
  id: GameId;
  baseGameId: BaseGameId;
  name: string;
  nameEn: string;
  difficulty: Difficulty;
  description: string;
  icon: string | null;
}

export interface GameResult {
  score: number;
  maxScore: number;
  details?: { label: string; points: number }[];
  answer?: string;
  feedback?: {
    goodPoints: string[];
    badPoints: string[];
  };
}

// 要約バトル
export interface SummaryChallenge {
  id: string;
  difficulty: Difficulty;
  text: string;
  wordLimit: number;
  referencePoints: string[];
}

// 続きを書け
export interface ContinueChallenge {
  id: string;
  difficulty: Difficulty;
  intro: string;
  wordLimit: number;
  referencePoints: string[];
}

// 指示の迷宮（複雑な指示に従えるか）
export interface InstructionStep {
  scenario: string;
  instruction: string;
  choices: { label: string; correct: boolean }[];
}

export interface InstructionChallenge {
  id: string;
  difficulty: Difficulty;
  steps: InstructionStep[];
}

export interface VersusRoom {
  roomCode: string;
  gameId: GameId;
  challengeId: string;
  hostId: string;
  guestId?: string;
  hostResult?: GameResult;
  guestResult?: GameResult;
  status: "waiting" | "playing" | "finished";
}
