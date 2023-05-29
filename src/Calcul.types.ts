export type PageName = 'config'|'generateExercicesV2'|'started'|'finish';

export type MinMax = {min: number, max: number}

export const calcTypes = ["addition",
  "soustraction",
  "multiplication",
  "division",
  "wholeDivision",
  "modulo"] as const;

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
  default: {
    numberOfGroup: number,
    group: MinMax,
    calcSpeRange: MinMax,
    calcSpeNumber: MinMax,
    calcType: '+'|'+ x*10'|'+ x'|'-'|'*'|'/'|'/ int'|'%',
    calcNumber: number,
    difficulty: number,
    questionDuration: number,
    answerDuration: number,
    gap: 'result'|'firstElement'|'secondElement'|'randomOnTheTwoFirstElements'|'randomOnAll',
  },
  displayLetterId: boolean,
}

export interface ColumnConfig {
  type: CalcType,
  1: {
    type: NumberType,
    min?: number,
    max?: number,
    fix?: number,
  },
  2: {
    type: NumberType,
    min?: number,
    max?: number,
    fix?: number,
  },
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
  equations?: [[[{
    1: number,
    type: CalcType,
    2: number,
    result: number|{quotient: number, remainder: number}
  }]]],
}