import { partOne, partTwo } from "./dayTwo.ts";
import { assertEquals } from "../deps.ts";

const input = `A Y
B X
C Z`;

Deno.test("day two part one", () => {
  const res = partOne(input);
  assertEquals(res, 15);
});

Deno.test("day two part two", () => {
  const res = partTwo(input);
  assertEquals(res, 12);
});
