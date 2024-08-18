// const {Bar, reset, start, startReverse} = useTimeBar({
//   time: 10000,
//   callback: () => console.debug('callbacked'),
//   reverse: true,
//   reverseTime: 5000,
//   reverseCallBack: () => console.debug('reverseCallBack');
//   color: 'red',
// });

import Bar from "@/Presentation/hooks/Bar.style.ts";
import useTime from "@/utils/hook/useTime.ts";
import {useState} from "react";

type TimeBarProps = {
  progressionPercentage?: number,
  color?: string,
};

const TimeBar = ({progressionPercentage = 0, color = 'red'}: TimeBarProps) => {
  return (<Bar $progressionPercentage={progressionPercentage} $color={color}><div></div></Bar>);
};

type hookProps = {
  duration?: number,
  callback?: () => void,
  reverse?: boolean,
  reverseDuration?: number,
  reverseCallBack?: () => void,
  color?: string,
};

export default ({
    duration = 5000,
    callback = () => {},
    reverse = false,
    reverseDuration = 5000,
    reverseCallBack = () => {},
    color = 'red',
  }: hookProps = {}) => {
  const [isReverse, setIsReverse] = useState(false);

  const {start, pause: pauseTimer, reset, time} = useTime({
    duration: duration,
    callback: () => {
      if (!isReverse) {
        callback();
      } else {
        reverseCallBack();
      }
      if(reverse && !isReverse) {
        setIsReverse(true);
        reset(reverseDuration);
        start();
      }
    },
  });

  const pause = pauseTimer;

  const startReverse = () => {
    setIsReverse(true);
    reset(reverseDuration);
  }

  const restart = () => {
    setIsReverse(false);
    reset(duration);
    start();
  }

  const progressionPercentage = 100*(isReverse ? ((reverseDuration - time) /reverseDuration) : time/duration);

  return {TimeBar: () => <TimeBar progressionPercentage={progressionPercentage} color={color}/>, start, pause, reset, startReverse, restart};
};