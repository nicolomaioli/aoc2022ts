import { calcScenicScore, parse, partOne } from "./8.ts";
import { assertEquals } from "../deps.ts";

const testInput = `30373
25512
65332
33549
35390
`;

Deno.test("day 8 part 1", () => {
  const got = partOne(testInput);
  assertEquals(got, 21);
});

Deno.test("day 8 part 2.1", () => {
  const forest = parse(testInput);
  const got = calcScenicScore(forest, 1, 2);
  assertEquals(got, 4);
});

Deno.test("day 8 part 2.2", () => {
  const forest = parse(testInput);
  const got = calcScenicScore(forest, 3, 2);
  assertEquals(got, 8);
});
