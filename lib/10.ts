export const parse = (input: string) => {
  let x = 1;
  // initialise cycles to sync cycle with cycles index
  const cycles: Array<number> = [x];

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

export const partTwo = (_input: string) => {
  return 0;
};
