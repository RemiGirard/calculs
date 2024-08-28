import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import useTime from './useTime';

const TestComponent = ({ duration, intervalDuration, callback }: { duration: number, intervalDuration?: number, callback?: () => void }) => {
  const { start, pause, reset, time, timeLeft, isRunning } = useTime({ duration, intervalDuration, callback });
  return (
    <div>
      <div data-testid="time">{time}</div>
      <div data-testid="timeLeft">{timeLeft}</div>
      <div data-testid="isRunning">{isRunning.toString()}</div>
      <button onClick={start} data-testid="start">Start</button>
      <button onClick={pause} data-testid="pause">Pause</button>
      <button onClick={() => reset()} data-testid="reset">Reset</button>
    </div>
  );
};

describe('useTime hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
    cleanup();
  });

  it('should initialize with default values', () => {
    const { getByTestId } = render(<TestComponent duration={5000} />);
    expect(getByTestId('time').textContent).toBe('0');
    expect(getByTestId('timeLeft').textContent).toBe('5000');
    expect(getByTestId('isRunning').textContent).toBe('true');
  });

  it('should start the timer', () => {
    const { getByTestId } = render(<TestComponent duration={5000} intervalDuration={1000} />);
    fireEvent.click(getByTestId('start'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(getByTestId('time').textContent).toBe('1000');
    expect(getByTestId('timeLeft').textContent).toBe('4000');
    expect(getByTestId('isRunning').textContent).toBe('true');
  });

  it('should pause the timer', () => {
    const { getByTestId } = render(<TestComponent duration={5000} intervalDuration={1000} />);
    fireEvent.click(getByTestId('start'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    fireEvent.click(getByTestId('pause'));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(getByTestId('time').textContent).toBe('1000');
    expect(getByTestId('timeLeft').textContent).toBe('4000');
    expect(getByTestId('isRunning').textContent).toBe('false');
  });

  it('should reset the timer', () => {
    const { getByTestId } = render(<TestComponent duration={5000} intervalDuration={1000} />);
    fireEvent.click(getByTestId('start'));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    fireEvent.click(getByTestId('reset'));
    expect(getByTestId('time').textContent).toBe('0');
    expect(getByTestId('timeLeft').textContent).toBe('5000');
    expect(getByTestId('isRunning').textContent).toBe('false');
  });

  it('should call the callback when duration is reached', () => {
    const callback = vi.fn();
    const { getByTestId } = render(<TestComponent duration={3000} intervalDuration={1000} callback={callback} />);
    // fireEvent.click(getByTestId('start'));
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(callback).toHaveBeenCalled();
    expect(getByTestId('time').textContent).toBe('3000');
    expect(getByTestId('timeLeft').textContent).toBe('0');
    expect(getByTestId('isRunning').textContent).toBe('false');
  });
});
