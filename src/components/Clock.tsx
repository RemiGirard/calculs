import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Clock = ({isPlaying,duration,elapsedTime, rotation}) => {
  return <CountdownCircleTimer
    elapsedTime={elapsedTime}
    isPlaying={isPlaying}
    duration={duration}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
    rotation={rotation}
  >
   
  </CountdownCircleTimer>
}

export default Clock;