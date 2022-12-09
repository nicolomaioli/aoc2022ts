type Point = [number, number];
type Direction = "U" | "D" | "L" | "R";

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

const processStep = (
  direction: Direction,
  points: Array<Point>,
  locations: Array<Point>,
) => {
  const newPoints = points.reduce<Array<Point>>((acc, p, i) => {
    // we need to check if it's the head first, cause it moves different
    // also assume points = [head, tail1, ..., tailn]
    const newPoint: Point = (i === 0)
      ? movePoint(p, direction)
      : moveTail(p, points[i - 1]);

    acc.push(newPoint);
    return acc;
  }, []);

  // tail is the very last point
  // record new position to visited if we haven't been here before
  const tail = newPoints.at(-1);
  if (tail) {
    const found = locations.find((point) =>
      // c for coordinate
      point.every((c, i) => tail[i] === c)
    );

    if (!found) {
      // destructuring here is deliberate
      locations.push([...tail]);
    }

    return {
      newPoints,
      newLocations: locations,
    };
  }

  throw new Error("Tail gone missing send help");
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
          d: d as Direction, // why can't you infer from match ts :(
          n: Number(n),
        };
      }

      throw new Error(`Failed to parse ${line}`);
    });
};

const rope = (input: string, len: number) => {
  let points: Array<Point> = Array.from({ length: len }, () => [0, 0]);
  let locations: Array<Point> = [[0, 0]];

  parse(input)
    .forEach((move) => {
      let steps = move.n;

      while (steps > 0) {
        const { newPoints, newLocations } = processStep(
          move.d,
          points,
          locations,
        );

        // reassigning like this feels like a code smell
        points = newPoints;
        locations = newLocations;
        steps--;
      }
    });

  return locations.length;
};

export const partOne = (input: string) => {
  return rope(input, 2);
};

export const partTwo = (input: string) => {
  return rope(input, 10);
};
