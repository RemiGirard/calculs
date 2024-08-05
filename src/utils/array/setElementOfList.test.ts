import { describe, test, expect, vi } from 'vitest';
import setElementOfList from '@/utils/array/setElementOfList.ts';

describe('setElementOfList', () => {
  test.each([
    [true, [null, null, null], 1, [null, true, null]],
    [42, [1, 2, 3], 2, [1, 2, 42]],
    ['new', ['old', 'old', 'old'], 0, ['new', 'old', 'old']],
    // Large list
    [999, Array(1000).fill(0), 500, [...Array(500).fill(0), 999, ...Array(499).fill(0)]],
    // Nested arrays
    [[1, 2], [[0], [0], [0]], 1, [[0], [1, 2], [0]]],
    // Objects
    [{ key: 'value' }, [{}, {}, {}], 2, [{}, {}, { key: 'value' }]],
  ])('sets the right element', (newElement, list, index, expected) => {
    const setList = vi.fn();
    setElementOfList(newElement, list, setList, index);
    expect(setList).toHaveBeenCalledWith(expected);
  });

  test('logs error for index out of bounds', () => {
    const setList = vi.fn();
    const consoleErrorSpy = vi.spyOn(console, 'error');
    setElementOfList(1, [1, 2, 3], setList, 5);
    setElementOfList(1, [1, 2, 3], setList, -1);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Index out of bound');
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    consoleErrorSpy.mockRestore();
  });
});
