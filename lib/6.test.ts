import { partOne, partTwo } from "./6.ts";
import { assertEquals } from "../deps.ts";

Deno.test("day six part one", () => {
  const samples = [
    {
      in: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
      expected: 7,
    },
    {
      in: "bvwbjplbgvbhsrlpgdmjqwftvncz",
      expected: 5,
    },
    {
      in: "nppdvjthqldpwncqszvftbrmjlhg",
      expected: 6,
    },
    {
      in: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
      expected: 10,
    },
    {
      in: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
      expected: 11,
    },
  ];

  samples.forEach((sample) => {
    const got = partOne(sample.in);
    assertEquals(got, sample.expected);
  });
});

Deno.test("day six part two", () => {
  const samples = [
    {
      in: "mjqjpqmgbljsphdztnvjfqwrcgsmlb",
      expected: 19,
    },
    {
      in: "bvwbjplbgvbhsrlpgdmjqwftvncz",
      expected: 23,
    },
    {
      in: "nppdvjthqldpwncqszvftbrmjlhg",
      expected: 23,
    },
    {
      in: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg",
      expected: 29,
    },
    {
      in: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw",
      expected: 26,
    },
  ];

  samples.forEach((sample) => {
    const got = partTwo(sample.in);
    assertEquals(got, sample.expected);
  });
});
