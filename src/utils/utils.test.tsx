import { describe, test, expect } from 'vitest';
import { areArraysEqual, filterObject, getRandomItemOfArray, shuffleArray, times } from './utils';

describe('times', () => {
  test('times', () => {
    let a = 0;
    times(1, () => a++);
    expect(a).toEqual(1);
    times(10, () => a++);
    expect(a).toEqual(11);
  });
});

describe('filterObject', () => {
  test.each([
    [{}, () => true, {}],
    [{ a: 1, b: 2, c: 3 }, () => true, { a: 1, b: 2, c: 3 }],
    [{ a: 1, b: 2, c: 3 }, () => false, {}],
    [{ apple: 1, banana: 2, avocado: 3 }, (key: string) => key.startsWith('a'), { apple: 1, avocado: 3 }],
    [{ a: 1, b: 2, c: 3 }, (_:string, val: number) => val >= 2, { b: 2, c: 3 }],
    [{ a: 1, b: { c: 2 }, d: 3 }, (_:string, val: any) => typeof val === 'number', { a: 1, d: 3 }],
  ])('filterObject', (obj, filter, expected) => {
    expect(filterObject(obj, filter)).toEqual(expected);
  });
});

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

describe('shuffleArray', () => {
  test.each([
    [1, 2, 3, 4, 5],
    ['a', 'b', 'c', 'd', 'e'],
    [true, false, true, false],
    [],
    [1],
  ])('shuffleArray', (...originalArray: any[]) => {
    // Check if the shuffled array has the same length as the original array
    const shuffledArray = shuffleArray(originalArray);
    expect(shuffledArray.length).toEqual(originalArray.length);

    // Check if the shuffled array contains the same elements as the original array
    originalArray.forEach((element: any) => {
      expect(shuffledArray).toContain(element);
    });

    const newSet: any = [...new Set(originalArray)];

    // Check if some shuffled arrays are different from the original array
    if(newSet.length >= 2){
      let shuffledArrays: any[] = [];
      times(
        newSet.length < 10 ? 10 : 2,
        () => shuffledArrays.push(shuffleArray(originalArray))
        )
      expect(
        shuffledArrays.some((array) => !areArraysEqual(array, originalArray))
        ).true
    }
  });
});

describe('areArraysEqual', () => {
  test.each([
    [[], []],
    [[0], [0]],
    [[0, 1, 2, 3], [0, 1, 2, 3]],
    [['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd']],
  ])('areArraysEqual', (arrayA, arrayB) => {
    expect(areArraysEqual(arrayA, arrayB)).toBe(true)
  });

  test.each([
    [[], [0]],
    [[0], ['0']],
    [[0, 1, 3], [0, 1, 2, 3]],
    [['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd']],
  ])('areArraysEqual', (arrayA, arrayB) => {
    expect(areArraysEqual(arrayA, arrayB)).toBe(false)
  });
});