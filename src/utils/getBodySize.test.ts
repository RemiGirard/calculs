import {describe, expect, test, vi} from "vitest";
import getBodySize from "@/utils/getBodySize.ts";

describe('getBodySize', () => {
  test.each([
    [800, 600],
    [1024, 768],
    [1920, 1080],
    [1280, 720],
  ])('getBodyRatio with width %i and height %i', (width, height) => {
    vi.stubGlobal('document', {body: { clientWidth: width, clientHeight: height }});
    expect(getBodySize()).toEqual({width, height});
  });
});