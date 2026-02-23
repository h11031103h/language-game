import type { ContinueChallenge } from "../types";

export const STORY_CHALLENGES: ContinueChallenge[] = [
  {
    id: "c1",
    difficulty: "beginner",
    intro: "窓の外では雨が降り続いていた。彼は古い手紙を手に、しばらく考え込んでいた。そこには、忘れかけていた約束のことが書かれていた。",
    wordLimit: 80,
    referencePoints: ["雨", "手紙", "約束", "過去"],
  },
  {
    id: "c2",
    difficulty: "intermediate",
    intro: "駅のホームで、彼女は見知らぬ人から一枚の写真を渡された。「これはあなたのものです」と言われ、写真を見た瞬間、彼女の表情が変わった。",
    wordLimit: 100,
    referencePoints: ["駅", "写真", "驚き", "謎"],
  },
  {
    id: "c3",
    difficulty: "advanced",
    intro: "会議室で、彼は「その主張には論理の飛躍がある」と言い放った。相手は顔を赤らめたが、反論できなかった。彼は冷静に続けた。「相関と因果を混同している。データは示しているが、解釈が恣意的だ。Aが増えたからBが増えた、と結論するには、交絡因子の排除が最低限必要だ。君の分析にはそれがない」。部屋の空気が凍りつく中、彼は資料を一枚めくり、「では、別の仮説を検証してみよう。反証可能性のある形で仮説を立て、データで falsify できるか試す。それが科学の作法だ」と口を開いた。",
    wordLimit: 150,
    referencePoints: ["論理", "相関と因果", "仮説", "検証", "反証"],
  },
];
