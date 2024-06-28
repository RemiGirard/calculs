export const numberRangeTypes = [
  'fix',
  'range',
  'rangeTens',
] as const;

export type NumberRange = {
    type: 'fix',
    fix: number,
} | {
    type: 'range' | 'rangeTens',
    min: number,
    max: number,
};

export type NumberRangeType = NumberRange['type'];
