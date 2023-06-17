import { describe, test, expect } from 'vitest';
import { biggestNumberFirst, getRandomDivisibleNumbersInRange, getRandomInt, integerToLetter } from './number';

describe('getRandomInt', () => {
    test('positive', () => {
        expect(getRandomInt(0, 10)).toBeGreaterThanOrEqual(0);
        expect(getRandomInt(0, 10)).toBeLessThanOrEqual(10);
    });
    test.each([
        [0, 10],
        [0, 100],
        [0, 100000],
        [0, 10000000000000],
        [-8, 1],
        [-17, -3],
        [1, 1],
        [0, 0],
    ])('should return a random integer', (min, max) => {
        for(let i = 0; i < 10; i++) {
            expect(getRandomInt(min, max)).toBeGreaterThanOrEqual(min);
            expect(getRandomInt(min, max)).toBeLessThanOrEqual(max);
        }
    });
    test('wrong parameters', () => {
      expect(() => getRandomInt(10, 2)).throw();
      expect(() => getRandomInt(10, -2)).throw();
      expect(() => getRandomInt(-10, -20)).throw();
    })
});

describe('biggestNumberFirst', () => {
  test.each([
    [5, 5, [5, 5]],
    [3, 8, [8, 3]],
    [10, 7, [10, 7]],
    [-2, -5, [-2, -5]],
    [0, 0, [0, 0]],
    [-10, 5, [5, -10]],
    [1000, 10000, [10000, 1000]],
    [2.5, 1.5, [2.5, 1.5]],
  ])('returns the numbers in the correct order', (first, second, expected) => {
    expect(biggestNumberFirst(first, second)).toEqual(expected);
  });
});

describe('getRandomDivisibleNumbersInRange', () => {
  test.each([
    { min: 0, max: 10 },
    { min: 5, max: 15 },
    { min: 1, max: 10 },
    { min: 0, max: 100 },
  ])('returns an array of two integers for range %p to %p', ({ min, max }) => {
    const result = getRandomDivisibleNumbersInRange({ min, max });
    const [randomNumber, randomDivisor] = result;

    expect(Number.isInteger(randomNumber)).toBe(true);
    expect(Number.isInteger(randomDivisor)).toBe(true);
  });
});


describe('integerToLetter', () => {
  test.each([
    [1, 'a'],
    [5, 'e'],
    [26, 'z'],
    [0, ' '],
    [-1, ' '],
    [27, ' '],
  ])('returns the correct letter for integer %p', (integer, expected) => {
    const result = integerToLetter(integer);
    expect(result).toBe(expected);
  });
});