import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import delay from "@/utils/delay.ts";

const asyncUsage = async (time: number, func: () => void) => {
  await delay(time);
  func();
};

const thenUsage = (time: number, func: () => void) => {
  delay(time).then(func);
}

const promiseUsage = (time: number, func: () => void) => {
  return new Promise((resolve) => {
    delay(time).then(() => {
      func();
      resolve(null);
    });
  });
}

describe('delayed execution', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  })
  afterEach(() => {
    vi.restoreAllMocks();
  })
  it('should execute the function', async () => {
    const mock = vi.fn();
    delay(1000).then(mock);
    await vi.advanceTimersByTimeAsync(1000);

    expect(mock).toHaveBeenCalled();
  });
  it('should not execute the function', async () => {
    const mock = vi.fn();
    delay(1000).then(mock);
    await vi.advanceTimersByTimeAsync(500);
    expect(mock).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(500);
    expect(mock).toHaveBeenCalled();
  });
  it('should execute the function - short', async () => {
    const mock = vi.fn();
    delay(2).then(mock);
    await vi.advanceTimersByTimeAsync(1);
    expect(mock).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(mock).toHaveBeenCalled();
  });
  it('should execute the function - long', async () => {
    const mock = vi.fn();
    const aDay = 1000*60*60*24;

    delay(aDay*5).then(mock);
    await vi.advanceTimersByTimeAsync(aDay);
    expect(mock).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(aDay*5);
    expect(mock).toHaveBeenCalled();
  });
  it.skip('should execute the function - too long for test env', async () => {
    const mock = vi.fn();
    const aDay = 1000*60*60*24;

    delay(aDay*365).then(mock); // too long for the test
    await vi.advanceTimersByTimeAsync(aDay*30);
    expect(mock).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(aDay*365);
    expect(mock).toHaveBeenCalled();
  });
  it('should execute the function - async', async () => {
    const mock = vi.fn();
    asyncUsage(1000, mock);
    await vi.advanceTimersByTimeAsync(1000);
    expect(mock).toHaveBeenCalled();
  });
  it('should execute the function - then', async () => {
    const mock = vi.fn();
    thenUsage(1000, mock);
    await vi.advanceTimersByTimeAsync(1000);
    expect(mock).toHaveBeenCalled();
  });
  it('should execute the function - promise', async () => {
    const mock = vi.fn();
    promiseUsage(1000, mock);
    await vi.advanceTimersByTimeAsync(1000);
    expect(mock).toHaveBeenCalled();
  });
});