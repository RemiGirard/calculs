import { describe, expect, test } from "vitest";
import styleObjectToString from "@/utils/css/styleObjectToString";
import { CSSProperties } from "react";

describe('styleObjectToString', () => {
  test('converts a simple style object to a CSS string', () => {
    const styleObject: CSSProperties = {
      backgroundColor: 'red',
      color: 'blue',
    };
    expect(styleObjectToString(styleObject)).toEqual('background-color:red;color:blue;');
  });

  test('handles vendor prefixes correctly', () => {
    const styleObject: CSSProperties = {
      WebkitUserSelect: 'none',
      msUserSelect: 'none',
    };
    expect(styleObjectToString(styleObject)).toEqual('-webkit-user-select:none;-ms-user-select:none;');
  });

  test('handles an empty style object', () => {
    const styleObject: CSSProperties = {};
    expect(styleObjectToString(styleObject)).toEqual('');
  });

  test('handles style object with multiple uppercase letters', () => {
    const styleObject: CSSProperties = {
      MozTransitionDuration: '2s',
    };
    expect(styleObjectToString(styleObject)).toEqual('-moz-transition-duration:2s;');
  });

  test('handles style object with no uppercase letters', () => {
    const styleObject: CSSProperties = {
      border: '1px solid black',
    };
    expect(styleObjectToString(styleObject)).toEqual('border:1px solid black;');
  });
});