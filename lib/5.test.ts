import { crateParser, instructionParser, partOne, partTwo } from "./5.ts";
import { assertEquals } from "../deps.ts";

const testInput = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

Deno.test("crate parser", () => {
  const parsed = crateParser(testInput.trimEnd());
  assertEquals(parsed, [
    ["N", "Z"],
    ["D", "C", "M"],
    ["P"],
  ]);
});

Deno.test("crate parser edge case", () => {
  // for some reason P and J end up on the wrong stack
  const edgeCase = `[T]     [P]     [J]
[F] [S] [T]     [R]
 1   2   3   4   5
`;

  const parsed = crateParser(edgeCase.trimEnd());
  assertEquals(parsed, [
    ["T", "F"],
    ["S"],
    ["P", "T"],
    [],
    ["J", "R"],
  ]);
});

Deno.test("instruction parser", () => {
  const parsed = instructionParser(testInput.trimEnd().split("\n\n")[1]);
  assertEquals(parsed, [
    {
      amount: 1,
      from: 2,
      to: 1,
    },
    {
      amount: 3,
      from: 1,
      to: 3,
    },
    {
      amount: 2,
      from: 2,
      to: 1,
    },
    {
      amount: 1,
      from: 1,
      to: 2,
    },
  ]);
});

Deno.test("day five part one", () => {
  const got = partOne(testInput.trimEnd());
  assertEquals(got, "CMZ");
});

Deno.test("day five part two", () => {
  const got = partTwo(testInput.trimEnd());
  assertEquals(got, "MCD");
});
