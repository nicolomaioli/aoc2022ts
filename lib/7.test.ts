import { partOne, partTwo } from "./7.ts";
import { assertEquals } from "../deps.ts";

const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

Deno.test("day 7 part 1", () => {
  const got = partOne(testInput);
  assertEquals(got, 95437);
});

Deno.test("day 7 part 2", () => {
  const got = partTwo(testInput);
  assertEquals(got, 24933642);
});
