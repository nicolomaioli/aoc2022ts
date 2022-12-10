export const parse = (input: string) => {
  let x = 1;
  // offset to sync with cycles (start at 1)
  const cycles: Array<number> = [1];

  input
    .trimEnd()
    .split("\n")
    .forEach((instruction) => {
      // tick to process instruction
      cycles.push(x);

      if (instruction === "noop") {
        return;
      }

      const match = instruction.match(/addx (-\d+|\d+)/);
      if (!match) {
        throw new Error(`Unknown instruction ${instruction}`);
      }

      const [_, d] = match;
      const v = Number(d);

      if (isNaN(v)) {
        throw new Error(`Unexpected value ${d} in instruction ${instruction}`);
      }

      // tick to process addx
      x += v;
      cycles.push(x);
    });

  return cycles;
};

export const partOne = (input: string) => {
  const startCycle = 20;
  const frequency = 40;
  const cycles = parse(input);

  const reduced = cycles
    .reduce((acc, x, i) => {
      const j = i + 1;
      if (j === startCycle || (j - startCycle) % frequency === 0) {
        acc += x * j;
      }

      return acc;
    }, 0);

  return reduced;
};

export const partTwo = (input: string) => {
  const cycles = parse(input);
  const width = 40;

  // remove offset
  cycles.pop();

  const crt = cycles.map((x, i) => {
    let pixel = ".";
    const j = i % width;
    if (x - 1 <= j && j <= x + 1) {
      pixel = "#";
    }

    if ((i + 1) % width === 0) {
      pixel += "\n";
    }

    return pixel;
  }).join("");

  console.log("crt\n", crt);
  return crt;
};
