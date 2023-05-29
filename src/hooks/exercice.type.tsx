export const gapTypes = [
  '1',
  '2',
  'result',
] as const;

export type GapTypes = typeof gapTypes[number];

export const calcTypes = [
  "addition",
  "soustraction",
  "multiplication",
  "division",
  "wholeDivision",
  "modulo"
] as const;

export type CalcType = typeof calcTypes[number];

export interface Equation {
  1: number,
  operation: CalcType,
  2: number,
  result: number,
  gap: GapTypes,
}

export type Column = Equation[]

export interface Exercice {
  questionTime: number,
  answerTime: number,
  columns: Column[],
}