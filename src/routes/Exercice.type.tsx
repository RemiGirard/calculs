export type ElementId = '1'|'2'|'result'

export const calcTypes = [
  "addition",
  "soustraction",
  "multiplication",
  "division",
  "wholeDivision",
  "modulo"
] as const;

export type CalcType = typeof calcTypes[number];

export interface EquationInterface {
  1: number,
  operation: CalcType,
  2: number,
  result: number,
  gap: ElementId,
}

export type Column = EquationInterface[]

export interface Exercice {
  questionTime: number,
  answerTime: number,
  columns: Column[],
}

export type DisplayElementAnswer = 'show'|'hideAnswer'|'showAnswer'