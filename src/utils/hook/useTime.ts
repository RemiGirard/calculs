import { useEffect, useState, useRef } from 'react';

type hookProps = {
  duration?: number,
  intervalDuration?: number,
  callback?: () => void,
}

export default ({ duration = 5000, intervalDuration = 1000, callback = () => null }: hookProps = {}) => {
  const [time, setTime] = useState(0);
  const [localDuration, setLocalDuration] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [pauseRequested, setPauseRequested] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pause = () => setPauseRequested(true);
  const start = () => {
    setPauseRequested(false);
  };
  const reset = (newDuration: number = localDuration) => {
    setLocalDuration(newDuration);
    setTime(0);
    setPauseRequested(true);
    setResetRequested(true);
  }
  const timeLeft = Math.max(0, duration - time);

  useEffect(() => {
    if(resetRequested) setResetRequested(false);
    if (!pauseRequested) {
      intervalRef.current = setInterval(() => {
        setIsRunning(true);
        setTime((prevTime) => {
          const newTime = prevTime + intervalDuration;
          if (newTime >= duration) {
            callback();
            setIsRunning(false);
            clearInterval(intervalRef.current!);
          }
          return Math.min(newTime, duration);
        });
      }, intervalDuration);
    } else {
      setIsRunning(false);
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [pauseRequested, resetRequested]);

  return { start, pause, reset, time, timeLeft, isRunning };
};
