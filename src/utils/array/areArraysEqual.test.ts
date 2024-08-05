import {describe, expect, test} from "vitest";
import areArraysEqual from "@/utils/array/areArraysEqual.ts";

describe('areArraysEqual', () => {
  test.each([
    [[], []],
    [[0], [0]],
    [[0, 1, 2, 3], [0, 1, 2, 3]],
    [['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd']],
    [[{a: 1}],[{a: 1}]],
  ])('true examples', (arrayA, arrayB) => {
    expect(areArraysEqual(arrayA, arrayB)).toBe(true);
  });

  test.each([
    [[], [0]],
    [[0], ['0']],
    [[0, 1, 3], [0, 1, 2, 3]],
    [['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd']],
  ])('false examples', (arrayA, arrayB) => {
    expect(areArraysEqual(arrayA, arrayB)).toBe(false);
  });
});
