export type NumberRange = {
    type: 'fix',
    fix: number,
} | {
    type: 'range' | 'rangeTens',
    min: number,
    max: number,
};

export type NumberRangeTypes = NumberRange['type'];