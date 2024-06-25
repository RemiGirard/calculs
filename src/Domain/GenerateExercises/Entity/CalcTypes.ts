export const calcTypes = [
    "addition",
    "additionWithoutCarry",
    "soustraction",
    "positiveSoustraction",
    "positiveSoustractionWithoutCarry",
    "multiplication",
    "division",
    "intDivision",
    "modulo",
] as const;

export type CalcType = typeof calcTypes[number];