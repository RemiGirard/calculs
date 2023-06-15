import { CalcType } from "./ExerciceConfig.types";

export type ElementId = '1'|'2'|'result'

export type ModuloResult = {quotient: number, remainder:number};

export interface EquationInterface {
  1: number,
  operation: CalcType,
  2: number,
  result: number|ModuloResult,
  gap: ElementId,
}

export type Column = EquationInterface[]

export interface Exercice {
  questionTime: number,
  answerTime: number,
  columns: Column[],
}

export type DisplayElementAnswer = 'show'|'hideAnswer'|'showAnswer'