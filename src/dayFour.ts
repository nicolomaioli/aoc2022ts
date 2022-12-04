const sortInput = (input: string) => {
  return input
    .trimEnd()
    .split("\n")
    .map((pair) => {
      return pair.split(",").map((range) => {
        return range.split("-").map((el) => Number(el));
      });
    })
    .map((pair) => {
      // Sort pairs so that the widest range is right
      pair.sort((a, b) => {
        const rightA = a[1];
        const rightB = b[1];

        if (rightA === rightB) {
          // if the right boudaries are the same, we need to sort left
          return b[0] - a[0];
        }

        // otherwise we sort right
        return a[1] - b[1];
      });
      return pair;
    });
};

export const partOne = (input: string) => {
  return sortInput(input)
    .map((pair) => {
      // We can now check if the right range contains the left one by comparing
      // the left-most elements
      if (pair[0][0] >= pair[1][0]) {
        // This is the stupidest TS has ever been, god have mercy
        return 1 as number;
      }

      return 0;
    }).reduce((a, b) => a + b, 0);
};

export const partTwo = (input: string) => {
  return sortInput(input)
    .map((pair) => {
      // We can now check if the ranges overlap by comparing the right boudary
      // of the left range with the left boundary of the right range
      if (pair[0][1] >= pair[1][0]) {
        return 1 as number;
      }

      return 0;
    }).reduce((a, b) => a + b, 0);
};

const input = await Deno.readTextFile("./data/dayFour.txt");
console.log("part one", partOne(input));
console.log("part two", partTwo(input));
