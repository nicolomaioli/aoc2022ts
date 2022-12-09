type Point = [number, number];
type Direction = "U" | "D" | "L" | "R";
type Move = {
  d: Direction;
  n: number;
};

const movePoint = (p: Point, d: Direction) => {
  switch (d) {
    case "U":
      p[1] += 1;
      break;
    case "D":
      p[1] -= 1;
      break;
    case "L":
      p[0] -= 1;
      break;
    case "R":
      p[0] += 1;
      break;
  }

  return p;
};

const moveTail = (t: Point, h: Point) => {
  const dx = h[0] - t[0];
  const dy = h[1] - t[1];

  if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
    t[0] += Math.sign(dx);
    t[1] += Math.sign(dy);
  }

  return t;
};

const processMove = (
  move: Move,
  h: Point,
  t: Point,
  l: Array<Point>,
) => {
  let steps = move.n;

  while (steps > 0) {
    h = movePoint(h, move.d);
    t = moveTail(t, h);

    // new position to visited if we haven't been here before
    const found = l.find((loc) => loc.every((e, i) => t[i] === e));

    if (!found) {
      l.push([...t]);
    }

    steps--;
  }

  return { h, t, l };
};

const parse = (input: string) => {
  return input
    .trimEnd()
    .split("\n")
    .map((line) => {
      const match = line.match(/^(U|D|L|R) (\d+)$/);

      if (match) {
        const [_, d, n] = match;

        return {
          d: d as Direction,
          n: Number(n),
        };
      }

      throw new Error(`Failed to parse ${line}`);
    });
};

export const partOne = (input: string) => {
  let head: Point = [0, 0];
  let tail: Point = [0, 0];

  // we want copies not references here
  let locations: Array<Point> = [[...tail]];

  parse(input)
    .forEach((move) => {
      const res = processMove(move, head, tail, locations);
      head = res.h;
      tail = res.t;
      locations = res.l;
    });

  return locations.length;
};

export const partTwo = (_input: string) => {
  return 0;
};
