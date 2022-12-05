const enum Tokens {
  left = "[",
  right = "]",
  skip = "   ",
  ws = " ",
  eol = "\n",
}

type Stack = Array<string>;
type CrateStack = Array<Stack>;

type Instruction = {
  amount: number;
  from: number;
  to: number;
};

type Instructions = Array<Instruction>;

export const crateParser = (input: string): CrateStack => {
  // init crateStack
  const len = Math.ceil(input.split("\n")[0].length / 4);
  const crateStack: CrateStack = Array.from({ length: len }, () => []);

  let i = 0; // index of char
  let j = 0; // index of stack
  let cur = input[i]; // init cursor
  const parsed: Array<Tokens> = [];

  // parse until we get to the numbers
  while (/\D/.test(cur)) {
    // remember to push into stack
    if (cur === Tokens.ws) {
      if (parsed.length === 0) {
        // edge case: sequence can't begin with Tokens.ws, so it's Tokens.skip
        parsed.push(Tokens.skip);
        j++;
        i = i + Tokens.skip.length;
        cur = input[i];
        continue;
      } else if (parsed.at(-1) === Tokens.eol) {
        // if line begins with eol, it's either a Tokens.skip or a number

        // if lookahead is number, we are done
        if (/\d/.test(input[i + 1])) {
          i++;
          cur = input[i];
          continue;
        }

        // otherwise is Tokens.skip
        parsed.push(Tokens.skip);
        j++;
        i = i + Tokens.skip.length;
        cur = input[i];
        continue;
      } else if (parsed.at(-1) === Tokens.ws) {
        // only case for two consecutive Tokens.ws is Tokens.skip
        parsed.push(Tokens.skip);
        j++;
        i = i + Tokens.skip.length;
        cur = input[i];
        continue;
      } else {
        // it's a separator, move on
        parsed.push(cur);
        i++;
        cur = input[i];
        continue;
      }
    } else if (cur === Tokens.left) {
      parsed.push(cur);
      i++; // move to crate
      cur = input[i];
      crateStack[j].push(cur);
      j++;
      i++; // move to next token (will be Tokens.right)
      cur = input[i];
      continue;
    } else if (cur === Tokens.right) {
      parsed.push(cur);
      i++;
      cur = input[i];
      continue;
    } else if (cur === Tokens.eol) {
      parsed.push(cur);
      j = 0;
      i++;
      cur = input[i];
      continue;
    } else {
      // something went terribly wrong
      console.error("input", input);
      console.error("parsed", parsed);
      console.error("c", cur);
      console.error("i", i);
      throw new Error("crateParserError: something went wrong");
    }
  }

  return crateStack;
};

export const instructionParser = (input: string): Instructions => {
  // assume input contains only instructions, example:
  // move 10 from 7 to 2

  return input
    .split("\n")
    .map((line) => {
      const rg = /(\d+).+(\d+).+(\d+)/;
      const match = line.match(rg);

      if (!match) {
        console.error("line", line);
        throw new Error("InstructionParserError null match");
      } else if (match.length < 4) {
        console.error("match", match);
        throw new Error("InstructionParserError not enough matches");
      }

      const groups = match
        .slice(1)
        .map((n) => Number(n))
        .filter((n): n is number => {
          // Typeguard: filter out undefined
          return !!n;
        });

      return {
        amount: groups[0],
        from: groups[1],
        to: groups[2],
      };
    });
};

const parseInput = (input: string) => {
  const [cratesIn, instructionsIn] = input.trimEnd().split("\n\n");
  const crateStack = crateParser(cratesIn);
  const instructions = instructionParser(instructionsIn);

  return {
    crateStack,
    instructions,
  };
};

export const partOne = (input: string) => {
  const { crateStack, instructions } = parseInput(input);

  instructions.forEach((instruction) => {
    const { amount, from, to } = instruction;

    for (let i = 0; i < amount; i++) {
      const crate = crateStack[from - 1].shift() as string;
      crateStack[to - 1].unshift(crate);
    }
  });

  return crateStack.map((stack) => {
    return stack.shift();
  }).join("");
};

export const partTwo = (input: string) => {
  const { crateStack, instructions } = parseInput(input);

  instructions.forEach((instruction) => {
    const { amount, from, to } = instruction;
    const crates = crateStack[from - 1].splice(0, amount);
    crateStack[to - 1].splice(0, 0, ...crates);
  });

  return crateStack.map((stack) => {
    return stack.shift();
  }).join("");
};
