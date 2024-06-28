import { describe, expect, test } from 'vitest';
import times from '@/utils/times.ts';

describe('times', () => {
  test('times', () => {
    let a = 0;
    times(1, () => a++);
    expect(a).toEqual(1);
    times(10, () => a++);
    expect(a).toEqual(11);
  });
});
