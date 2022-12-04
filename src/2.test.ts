import { partOne, partTwo } from "./2.ts";
import { assertEquals } from "../deps.ts";

const testInput = `A Y
B X
C Z`;

Deno.test("day two part one", () => {
  const res = partOne(testInput);
  assertEquals(res, 15);
});

Deno.test("day two part two", () => {
  const res = partTwo(testInput);
  assertEquals(res, 12);
});
