export const calcTypeList = [
  'addition',
  'additionWithoutCarry',
  'subtraction',
  'positiveSubtraction',
  'positiveSubtractionWithoutCarry',
  'multiplication',
  'division',
  'intDivision',
  'modulo',
] as const;

export type CalcType = typeof calcTypeList[number];
