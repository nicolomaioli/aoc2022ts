import fs from 'fs';

const input = fs.readFileSync('./data/dayOne.txt', 'utf8');

const sortElves = (input: string) => {
  return input
    .split('\n\n')
    .map((arr) => {
      return arr
        .split('\n')
        .map((el) => Number(el))
        .reduce((a, b) => a + b, 0);
    })
    .sort((a, b) => b - a);
};

export const partOne = (input: string) => {
  return sortElves(input)[0];
};

export const partTwo = (input: string) => {
  return sortElves(input)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);
};

console.log('part one', partOne(input));
console.log('part two', partTwo(input));
