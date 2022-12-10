import { partOne as d1p1, partTwo as d1p2 } from "./lib/1.ts";
import { partOne as d2p1, partTwo as d2p2 } from "./lib/2.ts";
import { partOne as d3p1, partTwo as d3p2 } from "./lib/3.ts";
import { partOne as d4p1, partTwo as d4p2 } from "./lib/4.ts";
import { partOne as d5p1, partTwo as d5p2 } from "./lib/5.ts";
import { partOne as d6p1, partTwo as d6p2 } from "./lib/6.ts";
import { partOne as d7p1, partTwo as d7p2 } from "./lib/7.ts";
import { partOne as d8p1, partTwo as d8p2 } from "./lib/8.ts";
import { partOne as d9p1, partTwo as d9p2 } from "./lib/9.ts";
import { partOne as d10p1, partTwo as d10p2 } from "./lib/10.ts";

const in1 = await Deno.readTextFile("./data/1.txt");
console.log("=========================================");
console.log("1.1", d1p1(in1));
console.log("1.2", d1p2(in1));

const in2 = await Deno.readTextFile("./data/2.txt");
console.log("=========================================");
console.log("2.1", d2p1(in2));
console.log("2.2", d2p2(in2));

const in3 = await Deno.readTextFile("./data/3.txt");
console.log("=========================================");
console.log("3.1", d3p1(in3));
console.log("3.2", d3p2(in3));

const in4 = await Deno.readTextFile("./data/4.txt");
console.log("=========================================");
console.log("4.1", d4p1(in4));
console.log("4.2", d4p2(in4));

const in5 = await Deno.readTextFile("./data/5.txt");
console.log("=========================================");
console.log("5.1", d5p1(in5));
console.log("5.2", d5p2(in5));

const in6 = await Deno.readTextFile("./data/6.txt");
console.log("=========================================");
console.log("6.1", d6p1(in6));
console.log("6.2", d6p2(in6));

const in7 = await Deno.readTextFile("./data/7.txt");
console.log("=========================================");
console.log("7.1", d7p1(in7));
console.log("7.2", d7p2(in7));

const in8 = await Deno.readTextFile("./data/8.txt");
console.log("=========================================");
console.log("8.1", d8p1(in8));
console.log("8.2", d8p2(in8));

const in9 = await Deno.readTextFile("./data/9.txt");
console.log("=========================================");
console.log("9.1", d9p1(in9));
console.log("9.2", d9p2(in9));

const in10 = await Deno.readTextFile("./data/10.txt");
console.log("=========================================");
console.log("10.1", d10p1(in10));
console.log("10.2", d10p2(in10));
