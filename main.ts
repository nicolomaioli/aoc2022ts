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