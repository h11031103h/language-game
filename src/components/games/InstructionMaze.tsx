import { useState } from "react";
import type { GameMode, GameResult, Difficulty } from "../../types";
import type { InstructionChallenge } from "../../types";
import "./InstructionMaze.css";

interface InstructionMazeProps {
  mode: GameMode;
  challenge: InstructionChallenge;
  difficulty: Difficulty;
  onComplete: (result: GameResult, resultB?: GameResult) => void;
  onChangeProblem?: () => void;
}

export function InstructionMaze({ mode, challenge, onComplete, onChangeProblem }: InstructionMazeProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [correctA, setCorrectA] = useState(0);
  const [correctB, setCorrectB] = useState(0);
  const [choiceA, setChoiceA] = useState<number | null>(null);
  const [choiceB, setChoiceB] = useState<number | null>(null);

  const step = challenge.steps[stepIndex];
  const isLastStep = stepIndex === challenge.steps.length - 1;

  const canSubmit = mode === "versus"
    ? choiceA !== null && choiceB !== null
    : choiceA !== null;

  const handleSubmit = () => {
    if (mode === "versus") {
      const correctAThis = choiceA !== null && step.choices[choiceA].correct ? 1 : 0;
      const correctBThis = choiceB !== null && step.choices[choiceB].correct ? 1 : 0;
      const newCorrectA = correctA + correctAThis;
      const newCorrectB = correctB + correctBThis;

      if (isLastStep) {
        const scoreA = Math.round((newCorrectA / challenge.steps.length) * 100);
        const scoreB = Math.round((newCorrectB / challenge.steps.length) * 100);
        const isAdvanced = challenge.difficulty === "advanced";
        const getFeedback = (correct: number) => {
          const goodPoints: string[] = [];
          const badPoints: string[] = [];
          if (isAdvanced) {
            if (correct === challenge.steps.length) {
              goodPoints.push("論理の追跡が正確。");
              goodPoints.push("ひろゆき級合格。");
            } else if (correct >= challenge.steps.length * 0.5) {
              goodPoints.push("一部は正しく読めている。");
              badPoints.push("嘘つきと正直者の区別でミスがある。");
            } else {
              badPoints.push("論理の読み取りが甘い。");
              badPoints.push("ひろゆき級には程遠い。");
              goodPoints.push("...少なくとも最後まで解いた。");
            }
          }
          return { goodPoints, badPoints };
        };
        onComplete(
          {
            score: scoreA,
            maxScore: 100,
            details: [{ label: "正解数", points: newCorrectA }, { label: "問題数", points: challenge.steps.length }],
            answer: `${newCorrectA}/${challenge.steps.length}問正解`,
            feedback: isAdvanced ? getFeedback(newCorrectA) : undefined,
          },
          {
            score: scoreB,
            maxScore: 100,
            details: [{ label: "正解数", points: newCorrectB }, { label: "問題数", points: challenge.steps.length }],
            answer: `${newCorrectB}/${challenge.steps.length}問正解`,
            feedback: isAdvanced ? getFeedback(newCorrectB) : undefined,
          }
        );
      } else {
        setCorrectA(newCorrectA);
        setCorrectB(newCorrectB);
        setStepIndex((i) => i + 1);
        setChoiceA(null);
        setChoiceB(null);
      }
    } else {
      const correctAThis = choiceA !== null && step.choices[choiceA].correct ? 1 : 0;
      const newCorrect = correctA + correctAThis;

      if (isLastStep) {
        const score = Math.round((newCorrect / challenge.steps.length) * 100);
        const isAdvanced = challenge.difficulty === "advanced";
        const goodPoints: string[] = [];
        const badPoints: string[] = [];
        if (isAdvanced) {
          if (newCorrect === challenge.steps.length) {
            goodPoints.push("論理の追跡が正確。矛盾する指示の整理ができている。");
            goodPoints.push("ひろゆき級合格。");
          } else if (newCorrect >= challenge.steps.length * 0.5) {
            goodPoints.push("一部は正しく読めている。");
            badPoints.push("嘘つきと正直者の区別でミスがある。指示の優先順位を再確認せよ。");
          } else {
            badPoints.push("論理の読み取りが甘い。指示を表面的に読んでいないか？");
            badPoints.push("ひろゆき級には程遠い。基礎からやり直せ。");
            goodPoints.push("...少なくとも最後まで解いた。");
          }
        }
        onComplete({
          score,
          maxScore: 100,
          details: [{ label: "正解数", points: newCorrect }, { label: "問題数", points: challenge.steps.length }],
          answer: `${newCorrect}/${challenge.steps.length}問正解`,
          feedback: isAdvanced ? { goodPoints, badPoints } : undefined,
        });
      } else {
        setCorrectA(newCorrect);
        setStepIndex((i) => i + 1);
        setChoiceA(null);
      }
    }
  };

  return (
    <div className="instruction-maze">
      <div className="instruction-maze-progress">
        問題 {stepIndex + 1} / {challenge.steps.length}
      </div>

      <div className="instruction-maze-scenario">
        <h4 className="instruction-maze-label">状況</h4>
        <p>{step.scenario}</p>
      </div>

      <div className="instruction-maze-instruction">
        <h4 className="instruction-maze-label">従うべき指示</h4>
        <p className="instruction-maze-instruction-text">{step.instruction}</p>
      </div>

      <div className={`instruction-maze-choices ${mode === "versus" ? "versus" : ""}`}>
        {mode === "versus" ? (
          <>
            <div className="instruction-maze-choice-group">
              <h4 className="instruction-maze-label">Aの選択</h4>
              <div className="instruction-maze-buttons">
                {step.choices.map((choice, i) => (
                  <button
                    key={i}
                    className={`instruction-maze-choice ${choiceA === i ? "selected" : ""}`}
                    onClick={() => setChoiceA(i)}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="instruction-maze-choice-group">
              <h4 className="instruction-maze-label">Bの選択</h4>
              <div className="instruction-maze-buttons">
                {step.choices.map((choice, i) => (
                  <button
                    key={i}
                    className={`instruction-maze-choice ${choiceB === i ? "selected" : ""}`}
                    onClick={() => setChoiceB(i)}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="instruction-maze-choice-group">
            <h4 className="instruction-maze-label">選択肢</h4>
            <div className="instruction-maze-buttons">
              {step.choices.map((choice, i) => (
                <button
                  key={i}
                  className={`instruction-maze-choice ${choiceA === i ? "selected" : ""}`}
                  onClick={() => setChoiceA(i)}
                >
                  {choice.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        className="instruction-maze-submit"
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        {isLastStep ? "採点する" : "次へ"}
      </button>
      {onChangeProblem && (
        <button className="instruction-maze-change-problem" onClick={onChangeProblem}>
          別の問題
        </button>
      )}
    </div>
  );
}
