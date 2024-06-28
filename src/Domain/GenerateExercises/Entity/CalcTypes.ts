export const calcTypes = [
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

export type CalcType = typeof calcTypes[number];