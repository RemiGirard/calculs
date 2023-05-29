import { test, expect } from 'vitest';

import { columnPossibilititiesEstimation, combinePossibilities, generatePossibleEquations, getElementsPossibilitiesOfColumnConfig, getPossibilitiesOfANumber, mathFunctions, numberPossibilitesCount } from './useGenerator';

test('numberPossibilitesCount', () => {
  expect(numberPossibilitesCount({ type: 'fix', fix: 1 })).toEqual(1);
  expect(numberPossibilitesCount({ type: 'fix', fix: 123456 })).toEqual(1);
  expect(numberPossibilitesCount({ type: 'range', min: 1, max: 2 })).toEqual(2);
  expect(numberPossibilitesCount({ type: 'range', min: 1, max: 9 })).toEqual(9);
  expect(numberPossibilitesCount({ type: 'range', min: 12, max: 34 })).toEqual(23);
  expect(numberPossibilitesCount({ type: 'range', min: 1, max: -1 })).toEqual(3);
  expect(numberPossibilitesCount({ type: 'range', min: 9, max: -9 })).toEqual(19);
  expect(numberPossibilitesCount({ type: 'range', min: -1, max: -9 })).toEqual(9);
  expect(numberPossibilitesCount({ type: 'rangeTens', min: 10, max: 90 })).toEqual(9);
  expect(numberPossibilitesCount({ type: 'rangeTens', min: 1, max: 10 })).toEqual(1);
  expect(numberPossibilitesCount({ type: 'rangeTens', min: 1, max: 40 })).toEqual(4);
  expect(numberPossibilitesCount({ type: 'rangeTens', min: 1, max: 2 })).toEqual(0);
  expect(numberPossibilitesCount({ type: 'rangeTens', min: -10, max: 10 })).toEqual(3);
  expect(numberPossibilitesCount({ type: 'rangeTens', min: -20, max: -10 })).toEqual(2);
});

test('columnPossibilititiesCount', () => {
  expect(columnPossibilititiesEstimation({
    type: 'addition',
    1: { type: 'fix', fix: 1 },
    2: { type: 'fix', fix: 2 },
    answer: { 1: false, 2: false, result: false },
  })).toEqual(1);
  expect(columnPossibilititiesEstimation({
    type: 'addition',
    1: { type: 'fix', fix: 1 },
    2: { type: 'range', min: 1, max: 9 },
    answer: { 1: false, 2: false, result: false },
  })).toEqual(9);
  expect(columnPossibilititiesEstimation({
    type: 'addition',
    1: { type: 'range', min: 1, max: 9 },
    2: { type: 'range', min: 1, max: 9 },
    answer: { 1: false, 2: false, result: false },
  })).toEqual(81);
  expect(columnPossibilititiesEstimation({
    type: 'addition',
    1: { type: 'range', min: 10, max: 50 },
    2: { type: 'range', min: 1, max: 9 },
    answer: { 1: false, 2: false, result: false },
  })).toEqual(369);
  expect(columnPossibilititiesEstimation({
    type: 'addition',
    1: { type: 'range', min: 10, max: 50 },
    2: { type: 'range', min: 1, max: 9 },
    answer: { 1: false, 2: false, result: false },
  })).toEqual(369);
  expect(columnPossibilititiesEstimation({
    type: 'positiveSoustraction',
    1: { type: 'range', min: 10, max: 50 },
    2: { type: 'range', min: 1, max: 9 },
    answer: { 1: false, 2: false, result: false },
  })).toBeLessThan(369);
  expect(columnPossibilititiesEstimation({
    type: 'positiveSoustraction',
    1: { type: 'range', min: 1, max: 99 },
    2: { type: 'range', min: 1, max: 99 },
    answer: { 1: false, 2: false, result: false },
  })).toBeGreaterThan(100);
});

test('getPossibilitiesOfANumber', () => {
  expect(getPossibilitiesOfANumber({ type: 'fix', fix: 1 })).toEqual([1]);
  expect(getPossibilitiesOfANumber({ type: 'fix', fix: 123 })).toEqual([123]);
  expect(getPossibilitiesOfANumber({ type: 'range', min: 1, max: 9 })).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  expect(getPossibilitiesOfANumber({ type: 'range', min: 48, max: 50 })).toEqual([48, 49, 50]);
  expect(getPossibilitiesOfANumber({ type: 'range', min: -2, max: 3 })).toEqual([-2, -1, 0, 1, 2, 3]);
  expect(getPossibilitiesOfANumber({ type: 'range', min: -50, max: -48 })).toEqual([-50, -49, -48]);
  expect(getPossibilitiesOfANumber({ type: 'rangeTens', min: 10, max: 30 })).toEqual([10, 20, 30]);
  expect(getPossibilitiesOfANumber({ type: 'rangeTens', min: 1, max: 35 })).toEqual([10, 20, 30]);
});

test('getElementsPossibilitiesOfColumnConfig', () => {
  expect(getElementsPossibilitiesOfColumnConfig({
    type: 'addition',
    1: { type: 'fix', fix: 1 },
    2: { type: 'fix', fix: 2 },
    answer: { 1: false, 2: false, result: true },
  })).toEqual([[1], [2]]);
  expect(getElementsPossibilitiesOfColumnConfig({
    type: 'addition',
    1: { type: 'range', min: 1, max:9 },
    2: { type: 'fix', fix: 1 },
    answer: { 1: false, 2: false, result: true },
  })).toEqual([[1,2,3,4,5,6,7,8,9], [1]]);
  expect(getElementsPossibilitiesOfColumnConfig({
    type: 'addition',
    1: { type: 'rangeTens', min: 1, max:35 },
    2: { type: 'fix', fix: 1 },
    answer: { 1: false, 2: false, result: true },
  })).toEqual([[10,20,30], [1]]);
})

test('combinePossibilities', () => {
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

test('generatePossibleEquations',()=>{
  expect(generatePossibleEquations({
    type: 'addition',
    1: { type: 'fix', fix: 1 },
    2: { type: 'fix', fix: 1 },
    answer: { 1: false, 2: false, result: true },
  })).toEqual([{1: 1, operation: 'addition', 2:1, result:2, gap:'result' }]);
  expect(generatePossibleEquations({
    type: 'addition',
    1: { type: 'range', min: 1, max:9 },
    2: { type: 'fix', fix: 1 },
    answer: { 1: false, 2: false, result: true },
  })).toEqual([
    {1: 1, operation: 'addition', 2:1, result:2, gap:'result' },
    {1: 2, operation: 'addition', 2:1, result:3, gap:'result' },
    {1: 3, operation: 'addition', 2:1, result:4, gap:'result' },
    {1: 4, operation: 'addition', 2:1, result:5, gap:'result' },
    {1: 5, operation: 'addition', 2:1, result:6, gap:'result' },
    {1: 6, operation: 'addition', 2:1, result:7, gap:'result' },
    {1: 7, operation: 'addition', 2:1, result:8, gap:'result' },
    {1: 8, operation: 'addition', 2:1, result:9, gap:'result' },
    {1: 9, operation: 'addition', 2:1, result:10, gap:'result' },
  ]);
  expect(generatePossibleEquations({
    type: 'positiveSoustraction',
    1: { type: 'range', min: 1, max:9 },
    2: { type: 'fix', fix: 1 },
    answer: { 1: false, 2: false, result: true },
  })).toEqual([
    {1: 1, operation: 'positiveSoustraction', 2:1, result:0, gap:'result' },
    {1: 2, operation: 'positiveSoustraction', 2:1, result:1, gap:'result' },
    {1: 3, operation: 'positiveSoustraction', 2:1, result:2, gap:'result' },
    {1: 4, operation: 'positiveSoustraction', 2:1, result:3, gap:'result' },
    {1: 5, operation: 'positiveSoustraction', 2:1, result:4, gap:'result' },
    {1: 6, operation: 'positiveSoustraction', 2:1, result:5, gap:'result' },
    {1: 7, operation: 'positiveSoustraction', 2:1, result:6, gap:'result' },
    {1: 8, operation: 'positiveSoustraction', 2:1, result:7, gap:'result' },
    {1: 9, operation: 'positiveSoustraction', 2:1, result:8, gap:'result' },
  ]);
  expect(generatePossibleEquations({
    type: 'positiveSoustraction',
    1: { type: 'range', min: 1, max:9 },
    2: { type: 'fix', fix: 5 },
    answer: { 1: false, 2: false, result: true },
  })).toEqual([
    {1: 5, operation: 'positiveSoustraction', 2:5, result:0, gap:'result' },
    {1: 6, operation: 'positiveSoustraction', 2:5, result:1, gap:'result' },
    {1: 7, operation: 'positiveSoustraction', 2:5, result:2, gap:'result' },
    {1: 8, operation: 'positiveSoustraction', 2:5, result:3, gap:'result' },
    {1: 9, operation: 'positiveSoustraction', 2:5, result:4, gap:'result' },
  ]);
});

test('mathFunctions',()=>{
  expect(mathFunctions.addition(1,1)).toEqual(2);
  expect(mathFunctions.addition(12,34)).toEqual(46);
  expect(mathFunctions.addition(-12,34)).toEqual(22);
  expect(mathFunctions.addition(-12,-34)).toEqual(-46);
  expect(mathFunctions.addition(1,-1)).toEqual(0);
  expect(mathFunctions.positiveSoustraction(1,1)).toEqual(0);
  expect(mathFunctions.positiveSoustraction(34,12)).toEqual(22);
  expect(mathFunctions.positiveSoustraction(-12,34)).toEqual(-46);
  expect(mathFunctions.positiveSoustraction(-12,-34)).toEqual(22);
  expect(mathFunctions.positiveSoustraction(1,-1)).toEqual(2);
  expect(mathFunctions.modulo(11,5)).toEqual({quotient:2, remainder: 1});
  expect(mathFunctions.modulo(1,5)).toEqual({quotient:0, remainder: 1});
})
