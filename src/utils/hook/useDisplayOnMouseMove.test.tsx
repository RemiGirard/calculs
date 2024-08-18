import { afterEach, describe, expect, test, beforeEach, vi } from 'vitest';
import {render, fireEvent, cleanup, act} from '@testing-library/react';
import useDisplayOnMouseMove from '@/utils/hook/useDisplayOnMouseMove';

const TestComponent = ({ elementToWatch, timeout }: { elementToWatch: HTMLElement, timeout?: number }) => {
  const { display } = useDisplayOnMouseMove({ elementToWatch, timeout });
  return <div data-testid="display">{display.toString()}</div>;
};

describe('useDisplayOnMouseMove', () => {
  let elementToWatch: HTMLElement;

  beforeEach(() => {
    vi.useFakeTimers();
    elementToWatch = document.createElement('div');
    elementToWatch.id = 'elementToWatch';
    document.body.appendChild(elementToWatch);
  });

  afterEach(() => {
    vi.useRealTimers();
    if (document.body.contains(elementToWatch)) {
      document.body.removeChild(elementToWatch);
    }
    vi.clearAllTimers();
    cleanup();
  });

  test('should initialize with display set to false', () => {
    const { getByTestId } = render(<TestComponent elementToWatch={elementToWatch} />);
    expect(getByTestId('display').textContent).toBe('false');
  });

  test('should set display to true on mousemove and reset timeout', () => {
    const { getByTestId } = render(<TestComponent elementToWatch={elementToWatch} timeout={1000} />);

    expect(getByTestId('display').textContent).toBe('false');

    fireEvent.mouseMove(elementToWatch);
    expect(getByTestId('display').textContent).toBe('true');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(getByTestId('display').textContent).toBe('true');

    fireEvent.mouseMove(elementToWatch);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(getByTestId('display').textContent).toBe('false');
  });

  test('should clean up event listeners and timeouts on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = render(<TestComponent elementToWatch={elementToWatch} timeout={1000} />);

    unmount();

    fireEvent.mouseMove(elementToWatch);
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // No way to directly test if event listeners are removed, but we can check if the timeout was cleared
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    clearTimeoutSpy.mockRestore();
  });
});