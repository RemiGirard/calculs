import { useEffect, useState, useRef } from 'react';

type hookProps = {
  duration?: number,
  intervalDuration?: number,
  callback?: () => void,
}

export default ({ duration = 5000, intervalDuration = 1000, callback = () => null }: hookProps = {}) => {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [resetRequested, setResetRequested] = useState(false); // trigger useEffect even if pause doesn't change
  const intervalRef = useRef<ReturnType<typeof setInterval>| undefined>();

  const start = () => setPaused(false);

  const pause = () => setPaused(true);

  const reset = () => {
    setResetRequested(true);
    setPaused(true);
    setTime(0);
  };

  if(paused) clearInterval(intervalRef.current);

  useEffect(() => {
    if(resetRequested) {
      // return early to avoid any changes
      // when set to false it will re-trigger the useEffect
      setResetRequested(false);
      return;
    }
    if(paused) return;
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + intervalDuration;
        if(newTime >= duration) {
          pause();
          callback();
          clearInterval(intervalRef.current as NodeJS.Timeout);
        }
        return Math.min(newTime, duration);
      });

    }, intervalDuration);
    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    };
  }, [paused, resetRequested]);

  useEffect(() => {
    start(); // start auto on loaded
  }, []);

  return { start, pause, reset, time, timeLeft: duration-time, isRunning: !paused };
};
