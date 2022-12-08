export const parse = (input: string) => {
  return input
    .trimEnd()
    .split("\n")
    .map((el) => el.split("").map((el) => Number(el)));
};

const getRight = (arr: number[], i: number) => {
  return [...arr.slice(i + 1, arr.length)];
};

const getLeft = (arr: number[], i: number) => {
  return [...arr.slice(0, i).reverse()];
};

function* getCol(matrix: number[][], j: number) {
  for (let i = 0; i < matrix.length; i++) {
    yield matrix[i][j];
  }
}

export const partOne = (input: string) => {
  const forest = parse(input);

  const visibleLeft = (arr: number[], i: number) => {
    return i === 0 || getLeft(arr, i).every((t) => t < arr[i]);
  };

  const visibleRight = (arr: number[], i: number) => {
    return i === arr.length - 1 ||
      getRight(arr, i).every((t) => t < arr[i]);
  };

  let acc = 0;
  for (let i = 0; i < forest.length; i++) {
    const row = [...forest[i]];
    for (let j = 0; j < row.length; j++) {
      const col = Array.from(getCol(forest, j));

      const left = visibleLeft(row, j);
      const right = visibleRight(row, j);
      const top = visibleLeft(col, i);
      const bottom = visibleRight(col, i);

      if (left || right || top || bottom) {
        acc++;
      }
    }
  }

  return acc;
};

const findFirst = (arr: number[], n: number) => {
  const first = arr.find((el) => el >= n);

  if (first) {
    return arr.indexOf(first) + 1;
  }

  return arr.length;
};

export const calcScenicScore = (matrix: number[][], i: number, j: number) => {
  const tree = matrix[i][j];
  const row = matrix[i];
  const col = Array.from(getCol(matrix, j));

  return [
    getLeft(row, j),
    getRight(row, j),
    getLeft(col, i),
    getRight(col, i),
  ]
    .map((arr) => findFirst(arr, tree))
    .reduce((a, b) => a * b, 1);
};

export const partTwo = (input: string) => {
  const forest = parse(input);

  return forest
    .map((line, i) => {
      return line.map((_, j) => {
        return calcScenicScore(forest, i, j);
      }).reduce((acc, val) => Math.max(acc, val));
    }).reduce((acc, val) => Math.max(acc, val));
};
