import { describe, expect, test } from 'vitest';

import { combinePossibilities } from './combinePossibilities.ts';

describe('combinePossibilities', () => {
  test.each([
    [[['a'], ['b'], ['c']], [['a', 'b', 'c']]],
    [[['a', 'b'], ['c', 'd']], [['a', 'c'], ['a', 'd'], ['b', 'c'], ['b', 'd']]],
    [[['a', 'b'], ['c', 'd'], ['e', 'f']], [['a', 'c', 'e'], ['a', 'c', 'f'], ['a', 'd', 'e'], ['a', 'd', 'f'], ['b', 'c', 'e'], ['b', 'c', 'f'], ['b', 'd', 'e'], ['b', 'd', 'f']]],
  ])('should return %p for %p', (input, expected) => {
    expect(combinePossibilities(input)).toEqual(expected);
  });
  expect(combinePossibilities([])).toEqual([]);
  expect(combinePossibilities([[]])).toEqual([]);
  expect(combinePossibilities([[1, 2]])).toEqual([[1], [2]]);
  expect(combinePossibilities([[1, 2], [3, 4]])).toEqual([[1, 3], [1, 4], [2, 3], [2, 4]]);
  expect(combinePossibilities([[1, 2], [3, 4], [5, 6]]))
    .toEqual([
      [1, 3, 5],
      [1, 3, 6],
      [1, 4, 5],
      [1, 4, 6],
      [2, 3, 5],
      [2, 3, 6],
      [2, 4, 5],
      [2, 4, 6],
    ]);
});
