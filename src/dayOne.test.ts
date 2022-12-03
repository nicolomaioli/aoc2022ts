import { partOne, partTwo } from './dayOne';

describe('day one', () => {
  const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

  test('part one', () => {
    const res = partOne(input);
    expect(res).toBe(24000);
  });

  test('part two', () => {
    const res = partTwo(input);
    expect(res).toBe(45000);
  });
});

export {};
