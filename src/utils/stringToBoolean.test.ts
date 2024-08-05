import {describe, expect, test} from "vitest";
import stringToBoolean from "@/utils/stringToBoolean.ts";

describe('stringToBoolean', () => {
  test.each([
    ['', false],
    ['true', true],
    ['false', false],
    ['null', false],
    ['sadsad', false],
  ])('stringToBoolean', (value, expected) => {
    expect(stringToBoolean(value)).toEqual(expected);
  });
});
