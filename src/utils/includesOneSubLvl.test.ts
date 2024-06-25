import {describe, expect, test} from "vitest";
import includesOneSubLvl from "./includesOneSubLvl";

describe('includesOneSubLvl', () => {
    test.each([
        [[[1], [2], [3]], [1], true],
        [[[1,2], [3,4]], [1,2], true],
        [[[1,3], [2,5]], [1,2], false],
    ])(`includesOneSubLvl`, (array, subArray, expected) => {
        expect(includesOneSubLvl(array, subArray)).toBe(expected);
    });
});
