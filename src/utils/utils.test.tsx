import { test, expect } from 'vitest';
import { areArraysEqual, shuffleArray, times } from './utils';
import { C } from '@tauri-apps/api/event-30ea0228';

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

test.each([
  [[], []],
  [[0], [0]],
  [[0, 1, 2, 3], [0, 1, 2, 3]],
  [['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd']],
])('areArraysEqual', (arrayA, arrayB) => {
  expect(areArraysEqual(arrayA, arrayB)).toBe(true)
})

test.each([
  [[], [0]],
  [[0], ['0']],
  [[0, 1, 3], [0, 1, 2, 3]],
  [['a', 'b', 'c', 'd', 'e'], ['a', 'b', 'c', 'd']],
])('areArraysEqual', (arrayA, arrayB) => {
  expect(areArraysEqual(arrayA, arrayB)).toBe(false)
})