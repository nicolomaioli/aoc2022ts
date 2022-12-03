import { z } from "https://deno.land/x/zod@v3.19.1/mod.ts";

const input = await Deno.readTextFile("./data/dayTwo.txt");

const schema = z.enum(["A", "B", "C", "X", "Y", "Z"]);
type schema = z.infer<typeof schema>;

const enum Choice {
  Rock = 1,
  Paper,
  Scissors,
}

const enum Points {
  Lost = 0,
  Draw = 3,
  Won = 6,
}

const strToChoice = (s: schema) => {
  if (s === "A" || s === "X") return Choice.Rock;
  if (s === "B" || s === "Y") return Choice.Paper;
  return Choice.Scissors;
};

const game = (p: Choice, t: Choice): Points => {
  if (p === t) return Points.Draw;

  if (p === Choice.Rock && t === Choice.Scissors) return Points.Lost;
  if (p === Choice.Paper && t === Choice.Rock) return Points.Lost;
  if (p === Choice.Scissors && t === Choice.Paper) return Points.Lost;

  return Points.Won;
};

export const partOne = (input: string) => {
  const roundTotals = input.trimEnd()
    .split("\n")
    .map((round) => {
      const [p, t] = round.split(" ").map((o) => {
        const v = schema.parse(o);
        return strToChoice(v);
      });

      if (p === undefined || t === undefined) {
        throw new Error("Something went wrong");
      }

      const res = game(p, t);
      return res + t;
    });

  return roundTotals.reduce((a, b) => a + b, 0);
};

export const partTwo = (input: string) => {
  return 0;
};

console.log("part one", partOne(input));
// console.log("part two", partTwo(input));
