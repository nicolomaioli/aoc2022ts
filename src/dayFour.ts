const inputToStruct = (input: string) => {
  return input
    .trimEnd()
    .split("\n")
    .map((pair) => {
      return pair.split(",").map((range) => {
        return range.split("-").map((el) => Number(el));
      });
    });
};

export const partOne = (input: string) => {
  const struct = inputToStruct(input);

  let count = 0;
  struct.forEach((pair) => {
    // Sort pairs so that the widest range is right
    pair.sort((a, b) => {
      const rightA = a[1];
      const rightB = b[1];

      if (rightA === rightB) {
        // if the right ranges are the same, we need to sort left
        return b[0] - a[0];
      }

      // otherwise we sort right
      return a[1] - b[1];
    });

    // We can now check if the right range contains the left one by comparing
    // the left-most elements
    if (pair[0][0] >= pair[1][0]) {
      count++;
    }
  });

  return count;
};

export const partTwo = (input: string) => {
  const struct = inputToStruct(input);

  let count = 0;
  struct.forEach((pair) => {
    // Sort pairs so that the widest range is right
    pair.sort((a, b) => {
      const rightA = a[1];
      const rightB = b[1];

      if (rightA === rightB) {
        // if the right ranges are the same, we need to sort left
        return b[0] - a[0];
      }

      // otherwise we sort right
      return a[1] - b[1];
    });

    // We can now check if the right range contains the left one by comparing
    // the left-most elements
    if (pair[0][1] >= pair[1][0]) {
      count++;
    }
  });

  return count;
};

const input = await Deno.readTextFile("./data/dayFour.txt");
console.log("part one", partOne(input));
console.log("part two", partTwo(input));
