import { partOne, partTwo } from "./dayTwo.ts";
import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

const input = `A Y
B X
C Z`;

Deno.test("day two part one", () => {
  const res = partOne(input);
  assertEquals(res, 15);
});
