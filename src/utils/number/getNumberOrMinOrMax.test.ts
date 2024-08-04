import { describe, test, expect } from 'vitest';
import getNumberOrMinOrMax from '@/utils/number/getNumberOrMinOrMax.ts';

describe('getNumberOrMinOrMax', () => {
  test.each([
    [5, 1, 10, 5], // value within bounds
    [0, 1, 10, 1], // value below min
    [15, 1, 10, 10], // value above max
    [1, 1, 10, 1], // value equal to min
    [10, 1, 10, 10], // value equal to max
  ])('returns the correct value for value=%d, min=%d, max=%d', (value, min, max, expected) => {
    expect(getNumberOrMinOrMax(value, min, max)).toBe(expected);
  });
});