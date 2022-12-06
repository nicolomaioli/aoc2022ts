const findMarker = (input: string, l: number) => {
  let i = 0; // index of c
  let check = true; // do we have a sequence
  const marker: Array<string> = [];

  while (check && i < input.length) {
    const c = input[i];
    marker.push(c);

    if (marker.length > l) {
      marker.shift();
    }

    if (marker.length === l) {
      check = !marker.every((el, i) => marker.indexOf(el) === i);
    }

    i++;
  }

  return i;
};

export const partOne = (input: string) => {
  return findMarker(input, 4);
};

export const partTwo = (input: string) => {
  return findMarker(input, 14);
};
