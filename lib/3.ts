export const calculatePriority = (c: string) => {
  const isUppercase = (c === c.toUpperCase());

  if (isUppercase) {
    // 'A'.charCodeAt(0) = 65
    return (c.charCodeAt(0) - 64 + 26);
  }

  // 'a'.charCodeAt(0) = 97
  return (c.charCodeAt(0) - 96);
};

export const partOne = (input: string) => {
  const commonItems = input
    .trimEnd()
    .split("\n")
    .map((rucksack) => {
      // We can assume input.length is even
      const size = rucksack.length / 2;

      const left = rucksack.slice(0, size).split("");
      const right = rucksack.slice(size).split("");

      for (let i = 0; i < left.length; i++) {
        const c = left[i];
        if (right.indexOf(c) >= 0) {
          return c;
        }
      }
    }).filter((item): item is string => {
      // Typeguard: filter out undefined
      return !!item;
    });

  if (commonItems.length > 0) {
    return commonItems.reduce((prev, cur) => {
      return prev + calculatePriority(cur);
    }, 0);
  }

  return 0;
};

function binarySearch(p: number, s: string[]): number {
  // assume s is sorted
  // returns the index of a char with priority p, or -1 if not found

  let left = 0;
  let right: number = s.length - 1;

  while (left <= right) {
    const i: number = Math.floor((left + right) / 2);
    const t = calculatePriority(s[i]);

    if (t === p) return i;
    if (p < t) right = i - 1;
    else left = i + 1;
  }

  return -1;
}

export const partTwo = (input: string) => {
  const rucksacks = input.split("\n");
  const badges: string[] = new Array(0);

  for (let i = 0; i < rucksacks.length; i = i + 3) {
    // get three strings
    // assuming rucksacks.length % 3 => 0
    const group = rucksacks.slice(i, i + 3).sort((a, b) => a.length - b.length);

    // group[0] is the shortest string
    const shortest = group[0].split("");

    for (let j = 0; j < shortest.length; j++) {
      const candidate = shortest[j];
      const p = calculatePriority(candidate);
      const s = group[1]
        .split("")
        .sort((a, b) => calculatePriority(a) - calculatePriority(b));
      const t = group[2]
        .split("")
        .sort((a, b) => calculatePriority(a) - calculatePriority(b));

      const k = binarySearch(p, s);
      const l = binarySearch(p, t);

      if (k >= 0 && l >= 0) {
        // found badge!
        badges.push(candidate);
        break;
      }
    }
  }

  if (badges.length > 0) {
    return badges.reduce((prev, cur) => {
      return prev + calculatePriority(cur);
    }, 0);
  }

  return 0;
};
