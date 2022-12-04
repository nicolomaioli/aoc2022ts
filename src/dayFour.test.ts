import { partOne, partTwo } from "./dayFour.ts";
import { assertEquals } from "../deps.ts";

const testInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

Deno.test("day four part one", () => {
  const got = partOne(testInput);
  assertEquals(got, 2);
});

Deno.test("edge case for sort", () => {
  const got = partOne("6-8,8-8");
  assertEquals(got, 1);
});

Deno.test("day four part two", () => {
  const got = partTwo(testInput);
  assertEquals(got, 4);
});
