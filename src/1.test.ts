import { partOne, partTwo } from "./1.ts";
import { assertEquals } from "../deps.ts";

const testInput = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

Deno.test("day one part one", () => {
  const res = partOne(testInput);
  assertEquals(res, 24000);
});

Deno.test("day two part two", () => {
  const res = partTwo(testInput);
  assertEquals(res, 45000);
});
