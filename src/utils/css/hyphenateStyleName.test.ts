import { describe, expect, test } from "vitest";
import hyphenateStyleName from "./hyphenateStyleName";
import {CSSProperties} from "react";

describe('hyphenateStyleName', () => {
  test.each<[keyof CSSProperties, string]>([
    ['backgroundColor', 'background-color'],
    ['WebkitUserSelect', '-webkit-user-select'],
    ['msUserSelect', '-ms-user-select'],
    ['MozUserSelect', '-moz-user-select'],
    ['OTransition', '-o-transition'],
  ])('converts %s to %s', (input, expected) => {
    expect(hyphenateStyleName(input)).toEqual(expected);
  });

  test('handles string with no uppercase letters', () => {
    expect(hyphenateStyleName('border')).toEqual('border');
  });

  test('handles string with multiple uppercase letters', () => {
    expect(hyphenateStyleName('MozTransitionDuration')).toEqual('-moz-transition-duration');
  });
});