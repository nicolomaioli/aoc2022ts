import { partOne, partTwo } from "./9.ts";
import { assertEquals } from "../deps.ts";

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

Deno.test("day 9 part 1", () => {
  const got = partOne(testInput);
  assertEquals(got, 13);
});

Deno.test("day 9 part 2", () => {
  const got = partTwo(testInput);
  assertEquals(got, 0);
});
