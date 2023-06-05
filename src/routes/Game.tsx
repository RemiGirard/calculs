import { useEffect, useMemo, useRef, useState } from 'react';

import useTimer from '../hooks/useTimer';
import ProgressBar from '../components/molecules/ProgressBar';
import dictionaryTyped from '../dictionary.json';
import Equation from '../components/molecules/Equation';
import colors from '../colors.json';
import { ColumnWrapper, GameWrapper } from './Game.style';

const dictionary:any = dictionaryTyped;

const Game = ({exercices, setGameOver = ()=>{}, config, startTimers = true, startingLevel = 0}: any) => {
  console.debug({exercices});
  const [currLevel, setCurrLevel] = useState(startingLevel);
  const [showAnswer, setShowAnswer] = useState(false);

  const [questionTimeStarted, setQuestionTimeStarted] = useState(startTimers);
  const [questionTimeReset, setQuestionTimeReset] = useState(false);
  const [answerTimeReset, setAnswerTimeReset] = useState(false);
  const [answerTimeStarted, setAnswerTimeStarted] = useState(false);

  const handleReStartAnswerTime = () => {
      setAnswerTimeReset(true);
      setAnswerTimeStarted(true);
      setShowAnswer(true)
  }

  const handleReStartQuestionTime = () => {
      setShowAnswer(false)
      setQuestionTimeReset(true);
      setQuestionTimeStarted(true);
  }

  const handleEndAnswerTime = () => {
      setAnswerTimeStarted(false);
      if(currLevel >= (exercices.length -1)){
          // all exercices are over
          setGameOver()
      } else {
          setCurrLevel(currLevel+1);
          handleReStartQuestionTime();
      }
  }

  const handleEndQuestionTime = () => {
      setQuestionTimeStarted(false);
      handleReStartAnswerTime()
  }

  const questionTime = useTimer({
    duration: exercices[currLevel].questionTime,
    callback: handleEndQuestionTime,
    started: questionTimeStarted,
    reset: questionTimeReset,
    setReset: setQuestionTimeReset,
    });
  const answerTime = useTimer({
    duration: exercices[currLevel].answerTime,
    callback: handleEndAnswerTime,
    started: answerTimeStarted,
    reset: answerTimeReset,
    setReset: setAnswerTimeReset,
  });

  const barValue = questionTimeStarted
    ? (questionTime/exercices[currLevel].questionTime)*100
    : ((exercices[currLevel].answerTime-answerTime )/ exercices[currLevel].answerTime) *100

  const [maxTextLength, setMaxTextLength] = useState(1);

  const updateParentTextSize = (number: number) => {
    if(number > maxTextLength){
      setMaxTextLength(number);
    }
  }

  const updatedMaxTextLengthForListener = useRef(1);

  useEffect(() => {
    updatedMaxTextLengthForListener.current = maxTextLength;
  }, [maxTextLength])

  const calculsTable = useRef<any>(undefined);

  const [dynamicFontSize, setDynamicFontSize] = useState(1);

  const calculateFontSize = () => {
    if(calculsTable.current){
      const widthSize = calculsTable.current.offsetWidth/exercices[currLevel].columns.length;
      const heightSize = calculsTable.current.offsetHeight/exercices[currLevel].columns[0].length;
      // maxTextLength
      const textHeight = 1
      setDynamicFontSize(Math.min(widthSize/(updatedMaxTextLengthForListener.current*12), heightSize/(textHeight*25)))
    }
  }
  
  useEffect(() => {
    if(calculsTable && calculsTable.current){
      calculateFontSize();
      const widthObserver = new ResizeObserver(calculateFontSize);
      widthObserver.observe(calculsTable.current);
      return () => {widthObserver.disconnect();}
    }
  },[maxTextLength])

  const tableSizes = useMemo(() => {
    if(exercices && exercices[currLevel]){
        return exercices[currLevel].columns.map((calculGroup: any, calculGroupIndex: number)=> {
          const groupSizes = calculGroup.reduce((acc: any, curr: any) => {
            let newAcc = structuredClone(acc);
            newAcc[1] = newAcc[1] < curr[1].toString().length ? curr[1].toString().length : newAcc[1];
            newAcc[2] = newAcc[2] < curr[2].toString().length ? curr[2].toString().length : newAcc[2];
            newAcc.result = newAcc.result < curr.result.toString().length
              ? (typeof curr.result !== 'number'
                ? 4 + Math.max(curr.result.quotient.toString().length, curr.result.remainder.toString().length)
                : curr.result.toString().length)
              : newAcc.result
            ;
            return newAcc;
          }, {1: 1, 2: 1, result: 1});
          return groupSizes;
        })
    } else {
      return [...(new Array(exercices[currLevel].groups.length)).map(() => {return {1: 1, 2: 1, result: 1};})];
    }
  }, [exercices, currLevel])

  let equationIndexExercice = 0;

  return (<GameWrapper>
    <div ref={calculsTable}>
      {exercices[currLevel].columns.map((column:any, columnIndex:any) => {
        return (<ColumnWrapper key={columnIndex} $columnLength={exercices[currLevel].columns.length}>
          {column.map((equation:any, index:number) => {
            equationIndexExercice++;
            return (<Equation
              key={index}
              equation={equation}
              equationIndexExercice={equationIndexExercice}
              displayLetterId={config.displayLetterId}
              showAnswer={showAnswer}
              updateParentTextSize={updateParentTextSize}
              columnSizes={tableSizes[columnIndex]}
              dynamicFontSize={dynamicFontSize}
            />);
          })}
        </ColumnWrapper>);
      })}
    </div>
    {startTimers
      ? <ProgressBar value={barValue} color={colors.bar.pink}></ProgressBar>
      :null
    }
  </GameWrapper>)
}

export default Game;