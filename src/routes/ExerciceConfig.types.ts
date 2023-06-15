import { Exercice } from "./Exercice.type";

export type PageName = 'config'|'generateExercices'|'started'|'finish';

export type MinMax = {min: number, max: number}

export const calcTypes = [
  "addition",
  "positiveSoustraction",
  "multiplication",
  "division",
  "intDivision",
  "modulo",
] as const;

export type CalcType = typeof calcTypes[number];

export const NumberTypes = [
  'fix',
  'range',
  'rangeTens',
];

export type NumberType = typeof NumberTypes[number];

export type Field = {
  name: string,
  field: 'groups'|'calcType'|'number'|'select'|'time',
  choices?: any[]
  default?: any,
}

export type Columns = Field[]

export interface ConfigInterface {
  displayLetterId: boolean,
}

export interface NumberConfig {
  type: NumberType,
  min?: number,
  max?: number,
  fix?: number,
}

export interface ColumnConfig {
  type: CalcType,
  1: NumberConfig,
  2: NumberConfig,
  answer: {
    1: boolean,
    2: boolean,
    result: boolean,
  },
}

export interface ExerciceConfig {
  questionTime: number,
  answerTime: number,
  equationCount: number,
  columns: ColumnConfig[],
  equations?: Exercice[],
}