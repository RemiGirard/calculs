import { useState } from 'react';

const useTimer = ({
    duration = 10,
    callback = () => {},
    started = true,
    setStarted = (oneArgument: any) => {},
    reset = false,
    setReset = (oneArgument: any) => {},
  }) => {
  const [time, setTime] = useState(duration);

  if(reset){
    setTime(duration);
    setReset(false);
  } else if (started  && time <= 0){
    callback();
    setStarted(false);
  } else if (started){
    setTimeout(() => {
      setTime(time - 1);
    }, 1000);  
  }

  return time;
}

export default useTimer;
