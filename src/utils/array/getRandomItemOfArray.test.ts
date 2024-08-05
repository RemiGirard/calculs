import {describe, expect, test} from "vitest";
import getRandomItemOfArray from "@/utils/array/getRandomItemOfArray";

describe('getRandomItemOfArray', () => {
  test('returns undefined when the array is empty', () => {
    const array: [] = [];
    const result = getRandomItemOfArray(array);
    expect(result).toBeUndefined();
  });

  test('returns a single item from the array', () => {
    const array = [1];
    const result = getRandomItemOfArray(array);
    expect(result).toBe(1);
  });

  test('returns a random item from the array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = getRandomItemOfArray(array);
    expect(array).toContain(result);
  });

  test('returns an item of the correct type from the array', () => {
    const array = ['apple', 'banana', 'orange'];
    const result = getRandomItemOfArray(array);
    expect(typeof result).toBe('string');
  });
});
