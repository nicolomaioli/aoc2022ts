export const partOne = (input: string) => {
  const head = [0, 0];
  const tail = [0, 0];

  // we want copies not references here
  const locations = [[...tail]];

  input
    .trimEnd()
    .split("\n")
    .map((line) => {
      const match = line.match(/^(U|D|L|R) (\d+)$/);

      if (match) {
        const [_, d, n] = match;

        return {
          d: d,
          n: Number(n),
        };
      }

      throw new Error(`Failed to parse ${line}`);
    }).forEach((move) => {
      let steps = move.n;

      while (steps > 0) {
        switch (move.d) {
          case "U":
            head[1] += 1;
            break;
          case "D":
            head[1] -= 1;
            break;
          case "L":
            head[0] -= 1;
            break;
          case "R":
            head[0] += 1;
            break;
          default:
            throw new Error(`Invalid move ${move}`);
        }

        const dx = head[0] - tail[0];
        const dy = head[1] - tail[1];

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          if (tail[0] === head[0] || tail[1] === head[1]) {
            switch (move.d) {
              case "U":
                tail[1] += 1;
                break;
              case "D":
                tail[1] -= 1;
                break;
              case "L":
                tail[0] -= 1;
                break;
              case "R":
                tail[0] += 1;
                break;
              default:
                throw new Error(`Invalid move ${move}`);
            }
          } else {
            // if the head and tail aren't touching and aren't in the same row or
            // column, the tail always moves one step diagonally to keep up
            tail[0] += Math.sign(dx);
            tail[1] += Math.sign(dy);
          }
        }

        // new position to visited if we haven't been here before
        const found = locations.find((loc) =>
          loc.every((e, i) => tail[i] === e)
        );

        if (!found) {
          locations.push([...tail]);
        }

        steps--;
      }
    });

  return locations.length;
};

export const partTwo = (_input: string) => {
  return 0;
};
