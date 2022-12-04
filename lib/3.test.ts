import { calculatePriority, partOne, partTwo } from "./3.ts";
import { assertEquals } from "../deps.ts";

const testInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

Deno.test("Calculates correct priority", () => {
  const items: Array<{
    in: string;
    expected: number;
  }> = [
    {
      in: "a",
      expected: 1,
    },
    {
      in: "z",
      expected: 26,
    },
    {
      in: "A",
      expected: 27,
    },
    {
      in: "Z",
      expected: 52,
    },
  ];

  items.forEach((item) => {
    const got = calculatePriority(item.in);
    assertEquals(got, item.expected);
  });
});

Deno.test("day three part one", () => {
  const got = partOne(testInput);
  assertEquals(got, 157);
});

Deno.test("day three part two", () => {
  const got = partTwo(testInput);
  assertEquals(got, 70);
});
