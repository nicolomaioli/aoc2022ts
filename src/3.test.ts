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
    input: string;
    expected: number;
  }> = [
    {
      input: "a",
      expected: 1,
    },
    {
      input: "z",
      expected: 26,
    },
    {
      input: "A",
      expected: 27,
    },
    {
      input: "Z",
      expected: 52,
    },
  ];

  items.forEach((item) => {
    const got = calculatePriority(item.input);
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
