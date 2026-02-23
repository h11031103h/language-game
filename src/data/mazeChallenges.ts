import type { InstructionChallenge } from "../types";

export const INSTRUCTION_CHALLENGES: InstructionChallenge[] = [
  {
    id: "m1",
    difficulty: "beginner",
    steps: [
      {
        scenario: "あなたは倉庫にいる。北の壁に「非常口は東」、南の壁に「出口は西」と書いてある。",
        instruction: "北の壁の表示に従って進め。",
        choices: [
          { label: "東へ進む", correct: true },
          { label: "西へ進む", correct: false },
          { label: "北へ進む", correct: false },
          { label: "南へ進む", correct: false },
        ],
      },
      {
        scenario: "3つの扉がある。左の扉には「開けるな」、中央に「正解」、右に「開けるな」と書いてある。",
        instruction: "「正解」と書かれた扉を選べ。",
        choices: [
          { label: "左の扉", correct: false },
          { label: "中央の扉", correct: true },
          { label: "右の扉", correct: false },
          { label: "どの扉も開けない", correct: false },
        ],
      },
      {
        scenario: "看板に「3番目の道を選べ」とある。あなたの左から1本目、2本目、3本目の道が並んでいる。",
        instruction: "看板の指示に従え。",
        choices: [
          { label: "1本目の道", correct: false },
          { label: "2本目の道", correct: false },
          { label: "3本目の道", correct: true },
          { label: "戻る", correct: false },
        ],
      },
    ],
  },
  {
    id: "m2",
    difficulty: "intermediate",
    steps: [
      {
        scenario: "壁Aに「正解は右」、壁Bに「壁Aの指示は嘘。左が正解」と書いてある。",
        instruction: "壁Bの指示に従え。壁Aは嘘だとされている。",
        choices: [
          { label: "右へ", correct: false },
          { label: "左へ", correct: true },
          { label: "前へ", correct: false },
          { label: "戻る", correct: false },
        ],
      },
      {
        scenario: "「1回目は左、2回目は右、3回目は左」とメモがある。あなたは今2回目の分岐点にいる。",
        instruction: "メモの指示に従え。",
        choices: [
          { label: "左へ", correct: false },
          { label: "右へ", correct: true },
          { label: "直進", correct: false },
          { label: "戻る", correct: false },
        ],
      },
      {
        scenario: "「赤い看板の指示に従え。青い看板は無視せよ」と書いてある。赤い看板には「西へ」、青い看板には「東へ」とある。",
        instruction: "この説明に従って進め。",
        choices: [
          { label: "東へ", correct: false },
          { label: "西へ", correct: true },
          { label: "南へ", correct: false },
          { label: "北へ", correct: false },
        ],
      },
    ],
  },
  {
    id: "m3",
    difficulty: "advanced",
    steps: [
      {
        scenario: "壁1には「東へ行け」とある。壁2には「壁1の指示に従うな。西へ行け」とある。両方の壁は同じ部屋にあり、どちらを先に見るかは自由である。",
        instruction: "壁2の指示に従え。壁2は「壁1に従うな」と言っている。壁1は無視し、壁2の「西へ行け」に従う。",
        choices: [
          { label: "東へ", correct: false },
          { label: "西へ", correct: true },
          { label: "南へ", correct: false },
          { label: "北へ", correct: false },
        ],
      },
      {
        scenario: "3つの壁がある。壁1: ゴールは東。壁2: 壁1が嘘なら西がゴール。壁3: 壁1と壁2のうち、正直者は1人だけ。嘘つきは2人。壁1と壁2は矛盾する主張をしている。どちらを信じるか、壁3の制約から論理的に導け。",
        instruction: "壁3の制約（正直者1人、嘘つき2人）を前提に、正直者の指示に従え。壁1と壁2の主張は排他的だ。どちらが正直者か、条件分岐で考えろ。",
        choices: [
          { label: "東へ", correct: false },
          { label: "西へ", correct: true },
          { label: "南へ", correct: false },
          { label: "北へ", correct: false },
        ],
      },
      {
        scenario: "看板1: 左が正解。看板2: 看板1は嘘。右が正解。看板3: 看板2は嘘。左が正解。3つのうち2つが嘘つき、1つが正直者。看板2と3は互いに「相手は嘘」と主張している。看板1と3は同じ答え（左）を出している。",
        instruction: "正直者の看板に従え。2つが嘘、1つが正直。看板2と3は矛盾しているので、どちらかは嘘。看板1と3の主張が一致することを手がかりに、論理を追え。",
        choices: [
          { label: "左へ", correct: true },
          { label: "右へ", correct: false },
          { label: "直進", correct: false },
          { label: "戻る", correct: false },
        ],
      },
    ],
  },
];
