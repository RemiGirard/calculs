import {describe, expect, test} from "vitest";
import filterObject from "@/utils/filterObject";

describe('filterObject', () => {
  test.each([
    [{}, () => true, {}],
    [{ a: 1, b: 2, c: 3 }, () => true, { a: 1, b: 2, c: 3 }],
    [{ a: 1, b: 2, c: 3 }, () => false, {}],
    [{ apple: 1, banana: 2, avocado: 3 }, (key: string) => key.startsWith('a'), { apple: 1, avocado: 3 }],
    [{ a: 1, b: 2, c: 3 }, (_:string, val: number) => val >= 2, { b: 2, c: 3 }],
  ])('filterObject', (obj, filter, expected) => {
    expect(filterObject(obj, filter)).toEqual(expected);
  });
  test('test by type', () => {
    // [{ a: 1, b: { c: 2 }, d: 3 } as {[key: string]: number | {}}, (key:string, val: (number|{})) => typeof val === 'number', { a: 1, d: 3 }],
    const obj = { a: 1, b: { c: 2 }, d: 3 };
    const filter = (_:string, val: (number|object)) => typeof val === 'number';
    const expected = { a: 1, d: 3 };
    expect(filterObject<number | object>(obj, filter)).toEqual(expected);
  });
});
