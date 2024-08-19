import { useEffect, useState, useRef } from 'react';

type hookProps = {
  duration?: number,
  intervalDuration?: number,
  callback?: () => void,
}

export default ({ duration = 5000, intervalDuration = 1000, callback = () => null }: hookProps = {}) => {
  const [time, setTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [resetRequested, setResetRequested] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => setPaused(false);

  const pause = () => setPaused(true);

  const reset = () => {
    setResetRequested(true);
    setPaused(true);
    setTime(0);
  };

  if(paused) clearInterval(intervalRef.current as NodeJS.Timeout);

  useEffect(() => {
    if(resetRequested) {
      setResetRequested(false);
      return;
    }
    if(paused) return;
    intervalRef.current = setInterval(() => {
      let triggerCallback = false;
      setTime((prevTime) => {
        const newTime = prevTime + intervalDuration;
        if(newTime >= duration) {
          pause();
          triggerCallback = true;
        }
        return Math.min(newTime, duration);
      });
      if(triggerCallback) callback();
    }, intervalDuration);
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [paused, resetRequested]);

  useEffect(() => {
    start();
  }, []);

  return { start, pause, reset, time, timeLeft: duration-time, isRunning: !paused };
};
