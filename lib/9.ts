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
  points: Array<Point>,
  locations: Array<Point>,
) => {
  let steps = move.n;

  while (steps > 0) {
    // for simplicity [head, tail1, ..., tailn]
    points = points.map((p, i) => {
      let newPoint: Point = [...p];

      if (i === 0) {
        // this is the head
        newPoint = movePoint(p, move.d);
      } else {
        newPoint = moveTail(p, points[i - 1]);
      }

      if (i === points.length - 1) {
        // tail is the very last point
        // record new position to visited if we haven't been here before
        const found = locations.find((loc) =>
          loc.every((e, i) => newPoint[i] === e)
        );

        if (!found) {
          locations.push([...newPoint]);
        }
      }

      return newPoint;
    });

    steps--;
  }

  return {
    points,
    locations,
  };
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
  let points: Array<Point> = Array.from({ length: 2 }, () => [0, 0]);
  let locations: Array<Point> = [[0, 0]];

  parse(input)
    .forEach((move) => {
      const res = processMove(move, points, locations);
      points = res.points;
      locations = res.locations;
    });

  return locations.length;
};

export const partTwo = (input: string) => {
  let points: Array<Point> = Array.from({ length: 10 }, () => [0, 0]);
  let locations: Array<Point> = [[0, 0]];

  parse(input)
    .forEach((move) => {
      const res = processMove(move, points, locations);
      points = res.points;
      locations = res.locations;
    });

  return locations.length;
};
