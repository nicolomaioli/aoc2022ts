import { partOne as dayOnePartOne, partTwo as dayOnePartTwo } from "./lib/1.ts";
import { partOne as dayTwoPartOne, partTwo as dayTwoPartTwo } from "./lib/2.ts";
import {
  partOne as dayThreePartOne,
  partTwo as dayThreePartTwo,
} from "./lib/3.ts";
import {
  partOne as dayFourPartOne,
  partTwo as dayFourPartTwo,
} from "./lib/4.ts";
import {
  partOne as dayFivePartOne,
  partTwo as dayFivePartTwo,
} from "./lib/5.ts";
import { partOne as daySixPartOne, partTwo as daySixPartTwo } from "./lib/6.ts";
import {
  partOne as daySevenPartOne,
  partTwo as daySevenPartTwo,
} from "./lib/7.ts";
import {
  partOne as dayEightPartOne,
  partTwo as dayEightPartTwo,
} from "./lib/8.ts";

const inputOne = await Deno.readTextFile("./data/1.txt");
console.log("=========================================");
console.log("1.1", dayOnePartOne(inputOne));
console.log("1.2", dayOnePartTwo(inputOne));

const inputTwo = await Deno.readTextFile("./data/2.txt");
console.log("=========================================");
console.log("2.1", dayTwoPartOne(inputTwo));
console.log("2.2", dayTwoPartTwo(inputTwo));

const inputThree = await Deno.readTextFile("./data/3.txt");
console.log("=========================================");
console.log("3.1", dayThreePartOne(inputThree));
console.log("3.2", dayThreePartTwo(inputThree));

const inputFour = await Deno.readTextFile("./data/4.txt");
console.log("=========================================");
console.log("4.1", dayFourPartOne(inputFour));
console.log("4.2", dayFourPartTwo(inputFour));

const inputFive = await Deno.readTextFile("./data/5.txt");
console.log("=========================================");
console.log("5.1", dayFivePartOne(inputFive));
console.log("5.2", dayFivePartTwo(inputFive));

const inputSix = await Deno.readTextFile("./data/6.txt");
console.log("=========================================");
console.log("6.1", daySixPartOne(inputSix));
console.log("6.2", daySixPartTwo(inputSix));

const inputSeven = await Deno.readTextFile("./data/7.txt");
console.log("=========================================");
console.log("7.1", daySevenPartOne(inputSeven));
console.log("7.2", daySevenPartTwo(inputSeven));

const inputEight = await Deno.readTextFile("./data/8.txt");
console.log("=========================================");
console.log("8.1", dayEightPartOne(inputEight));
console.log("8.2", dayEightPartTwo(inputEight));
