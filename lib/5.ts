const enum Tokens {
  left = "[",
  right = "]",
  skip = "   ",
  ws = " ",
  eol = "\n",
}

type Stack = Array<string>;
type CrateStack = Array<Stack>;

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
    } else if (tkn === Tokens.left || tkn === Tokens.right) {
      // again we can move on
      i++;
      tkn = input[i];
      continue;
    } else if (tkn === Tokens.eol) {
      // reset stack
      j = 0;
      i++;
      tkn = input[i];
      continue;
    } else {
      crateStack[j].push(tkn);
      j++;
      i++;
      tkn = input[i];
    }
  }

  return crateStack;
};

export const instructionParser = (_input: string) => {
  return [];
};

export const partOne = (_input: string) => {
  return 0;
};

export const partTwo = (_input: string) => {
  return 0;
};
