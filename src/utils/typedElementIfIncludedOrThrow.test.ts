import { describe, test, expect } from 'vitest';
import typedElementIfIncludedOrUndefined from "@/utils/typedElementIfIncludedOrUndefined.ts";

describe('yourFunctionName', () => {
    test('returns the value if it is in the array', () => {
        const array = [1, 2, 3];
        const value = 2;
        expect(typedElementIfIncludedOrUndefined(array, value)).toBe(value);
    });

    test('return undefined if the value is not in the array', () => {
        const array = [1, 2, 3];
        const value = 4;
        expect(typedElementIfIncludedOrUndefined(array, value)).toBeUndefined();
    });
});
