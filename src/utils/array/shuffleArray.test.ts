import { describe, expect, test } from "vitest";

import shuffleArray from "@/utils/array/shuffleArray.ts";
import areArraysEqual from "@/utils/array/areArraysEqual.ts";
import times from "@/utils/times.ts";

describe('shuffleArray', () => {
  test.each([
    [1, 2, 3, 4, 5],
    ['a', 'b', 'c', 'd', 'e'],
    [true, false, true, false],
    [],
    [1],
  ])('shuffleArray', (...originalArray: unknown[]) => {
    // Check if the shuffled array has the same length as the original array
    const shuffledArray = shuffleArray(originalArray);
    expect(shuffledArray.length).toEqual(originalArray.length);

    // Check if the shuffled array contains the same elements as the original array
    originalArray.forEach((element: unknown) => {
      expect(shuffledArray).toContain(element);
    });

    const newSet = [...new Set(originalArray)];

    // Check if some shuffled arrays are different from the original array
    if (newSet.length >= 2) {
      const shuffledArrays: unknown[][] = [];
      // chances of having the same shuffled arrays
      // 2 elements or more, shuffle 50 times : min 2!^50 = 10^30
      // 10 elements or more, shuffle 2 times : min 10!^4 = 10^26
      times(
        newSet.length < 10 ? 100 : 4,
        () => shuffledArrays.push(shuffleArray(originalArray)),
      );
      expect(
        shuffledArrays.some((array) => !areArraysEqual(array, originalArray)),
      ).true;
    }
  });
});