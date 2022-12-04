import { z } from "../deps.ts";

const choices = ["A", "B", "C"] as const;
const outcomes = ["X", "Y", "Z"] as const;

const inputSchema = z.enum([...choices, ...outcomes]);
type inputSchema = z.infer<typeof inputSchema>;

const choicesSchema = z.enum(choices);
type choicesSchema = z.infer<typeof choicesSchema>;

const outcomesSchema = z.enum(outcomes);
type outcomesSchema = z.infer<typeof outcomesSchema>;

const enum Choice {
  Rock = 1,
  Paper,
  Scissors,
}

const enum Outcome {
  Lose = 0,
  Draw = 3,
  Win = 6,
}

const strToChoice = (s: inputSchema) => {
  if (s === "A" || s === "X") return Choice.Rock;
  if (s === "B" || s === "Y") return Choice.Paper;
  return Choice.Scissors;
};

const strToOutcome = (s: outcomesSchema) => {
  if (s === "X") return Outcome.Lose;
  if (s === "Y") return Outcome.Draw;
  return Outcome.Win;
};

const choiceFromOutcome = (p: Choice, o: Outcome) => {
  if (o === Outcome.Draw) return p;

  if (p === Choice.Rock) {
    if (o === Outcome.Win) return Choice.Paper;
    if (o === Outcome.Lose) return Choice.Scissors;
  }

  if (p === Choice.Paper) {
    if (o === Outcome.Win) return Choice.Scissors;
    if (o === Outcome.Lose) return Choice.Rock;
  }

  if (p === Choice.Scissors) {
    if (o === Outcome.Win) return Choice.Rock;
    if (o === Outcome.Lose) return Choice.Paper;
  }

  return undefined;
};

const playRound = (p: Choice, t: Choice): Outcome => {
  if (p === t) return Outcome.Draw;

  if (p === Choice.Rock && t === Choice.Scissors) return Outcome.Lose;
  if (p === Choice.Paper && t === Choice.Rock) return Outcome.Lose;
  if (p === Choice.Scissors && t === Choice.Paper) return Outcome.Lose;

  return Outcome.Win;
};

export const partOne = (input: string) => {
  const roundTotals = input
    .trimEnd()
    .split("\n")
    .map((round) => {
      const [p, t] = round.split(" ").map((el) => {
        const validInput = inputSchema.parse(el);
        return strToChoice(validInput);
      });

      if (p === undefined || t === undefined) {
        throw new Error("Something went wrong");
      }

      const o = playRound(p, t);
      return o + t;
    });

  return roundTotals.reduce((a, b) => a + b, 0);
};

export const partTwo = (input: string) => {
  const roundTotals = input
    .trimEnd()
    .split("\n")
    .map((round) => {
      const [opponentChoice, desiredOutcome] = round.split(" ");
      const validChoice = choicesSchema.parse(opponentChoice);
      const validOutcome = outcomesSchema.parse(desiredOutcome);

      const p = strToChoice(validChoice);
      const o = strToOutcome(validOutcome);
      const t = choiceFromOutcome(p, o);

      if (t === undefined) throw new Error("Something went wrong");

      return o + t;
    });

  return roundTotals.reduce((a, b) => a + b, 0);
};
