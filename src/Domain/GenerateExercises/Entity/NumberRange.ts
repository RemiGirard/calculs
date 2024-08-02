export const numberRangeTypes = [
  'fix',
  'range',
  'rangeTens',
] as const;

export type FixNumberRange = {
    type: 'fix',
    fix: number,
}

export type RangeNumberRange = {
    type: 'range',
    min: number,
    max: number,
}

export type RangeTensNumberRange = {
    type: 'rangeTens',
    min: number,
    max: number,
}

export type NumberRange = FixNumberRange | RangeNumberRange | RangeTensNumberRange;

export type NumberRangeType = NumberRange['type'];
