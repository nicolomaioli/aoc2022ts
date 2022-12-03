import { z } from 'zod';
import fs from 'fs';

const input = fs.readFileSync('./data/dayTwo.txt', 'utf8');

const schema = z.enum(['A', 'B', 'C', 'X', 'Y', 'Z']);
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
  switch (s) {
    case 'A' || 'X':
      return Choice.Rock;
    case 'B' || 'Y':
      return Choice.Paper;
    default:
      return Choice.Scissors;
  }
};

const game = (p: Choice, t: Choice): Points => {
  if (p === t) return Points.Draw;

  if (p === Choice.Rock && t === Choice.Scissors) return Points.Lost;
  if (p === Choice.Paper && t === Choice.Rock) return Points.Lost;
  if (p === Choice.Scissors && t === Choice.Paper) return Points.Lost;

  return Points.Won;
};

export const partOne = (input: string) => {
  if (input.length === 0) throw new Error('WTF');

  const roundTotals = input.split('\n').map((round) => {
    const [p, t] = round.split(' ').map((o) => {
      const v = schema.parse(o);
      return strToChoice(v);
    });

    if (p === undefined || t === undefined) throw new Error('Wut');

    const res = game(p, t);
    return res + t;
  });

  return roundTotals.reduce((a, b) => a + b, 0);
};

export const partTwo = (input: string) => {
  return 0;
};

console.log('part one', partOne(input));
console.log('part two', partTwo(input));
