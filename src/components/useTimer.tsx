import { useState, useEffect } from 'react';

const useTimer = (duration = 10, callback = () => {console.log('default trigger')}, started = true, reset = false, setReset = (oneArgument: any) => {}) => {
  const [time, setTime] = useState(duration)


  if(started && !reset && time <= 0){
    callback()
    return time
  }

  if(reset){
    setTime(duration)
    setReset(false)
    return time 
  } else if (started){
    setTimeout(() => {
      setTime(time - 1);
    }, 1000);  
  }

  return time
}

export default useTimer;
