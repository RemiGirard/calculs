import {describe, expect, test, vi} from "vitest";
import { getBodyRatio } from "@/utils/getBodyRatio.ts";

describe('getBodyRatio', () => {
  test.each([
    [800, 600, 800 / 600],
    [1024, 768, 1024 / 768],
    [1920, 1080, 1920 / 1080],
    [1280, 720, 1280 / 720],
  ])('getBodyRatio with width %i and height %i', (width, height, expected) => {
    vi.stubGlobal('document', {body: { clientWidth: width, clientHeight: height }});
    expect(getBodyRatio()).toEqual(expected);
  });
});
