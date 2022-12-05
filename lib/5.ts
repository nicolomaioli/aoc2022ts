const enum Tokens {
  left = "[",
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

  let i = 0; // index in input
  let j = 0; // index of stack
  let tkn = input[i]; // init token
  const skipTknLen = Tokens.skip.length; // I know but this magic number f'd me

  // parse until we get to the numbers
  while (/\D/.test(tkn)) {
    if (tkn === Tokens.ws) {
      // look ahead for Tokens.skip
      if (input.slice(i, i + skipTknLen) === Tokens.skip) {
        j++; // move over to next stack
        i = i + skipTknLen; // step over Tokens.skip
        tkn = input[i];
        continue;
      } else {
        // it's a separator so we can move on
        i++;
        tkn = input[i];
        continue;
      }
    } else if (tkn === Tokens.left) {
      // parse push crate and move on until Tokens.right
      i++;
      tkn = input[i]; // crate is the following token
      crateStack[j].push(tkn); // push token
      j++; // move to next stack
      i = i + 2; // step over ']'
      tkn = input[i];
      continue;
    } else if (tkn === Tokens.eol) {
      // reset stack
      j = 0;
      i++;
      tkn = input[i];
      continue;
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
        throw new Error("InstructionParserError null match");
      } else if (match.length < 4) {
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

export const partOne = (_input: string) => {
  return "";
};

export const partTwo = (_input: string) => {
  return "";
};
