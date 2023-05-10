export type PageName = 'config'|'generateExercices'|'started'|'finish';

export type MinMax = {min: number, max: number}

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