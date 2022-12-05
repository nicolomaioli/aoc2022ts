import { crateParser } from "./5.ts";
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
  console.log("parsed", parsed);
  assertEquals(parsed, [
    ["N", "Z"],
    ["D", "C", "M"],
    ["P"],
  ]);
});
