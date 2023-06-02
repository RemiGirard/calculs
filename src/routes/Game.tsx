import React, { useEffect, useMemo, useRef, useState } from 'react';

import useTimer from '../hooks/useTimer';
import ProgressBar from '../components/ProgressBar';
import dictionaryTyped from '../dictionary.json';
import Equation from '../components/molecules/Equation';
import colors from '../colors.json';

const dictionary:any = dictionaryTyped;

const Game = ({exercices, setGameOver, config}: any) => {
  console.debug({exercices})
  const rerollLimit = 1000;
  const backgroundColor = '#022b40';

  const [currLevel, setCurrLevel] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false)

  const [questionTimeStarted, setQuestionTimeStarted] = useState(true)
  const [questionTimeReset, setQuestionTimeReset] = useState(false)
  const [answerTimeReset, setAnswerTimeReset] = useState(false)
  const [answerTimeStarted, setAnswerTimeStarted] = useState(false)

  const numbersCombinaisonAlreadyGenerated = (numbers:any, calculLevel:any) => {
    return !calculLevel.every((calculGroup:any) => calculGroup.every((curr:any) =>  JSON.stringify({...curr}) !== JSON.stringify({...numbers})) === true);
  }

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
    : ((exercices[currLevel].answerDuration-answerTime )/ exercices[currLevel].answerTime) *100

    let granularity = [1, 1];
    if (exercices && exercices[currLevel] && exercices[currLevel][0]){
      granularity[1];
    }

    
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
        return () => {
          widthObserver.disconnect();
        }
      }
    },[maxTextLength])

    const tableSizes = useMemo(() => {
      if(exercices && exercices[currLevel]){
          return exercices[currLevel].columns.map((calculGroup: any, calculGroupIndex: number)=> {
            const groupSizes = calculGroup.reduce((acc: any, curr: any) => {
              let newAcc = structuredClone(acc);
              newAcc[1] = newAcc[1] < curr[1].toString().length ? curr[1].toString().length : newAcc[1];
              newAcc[2] = newAcc[2] < curr[2].toString().length ? curr[2].toString().length : newAcc[2];
              newAcc['result'] = newAcc['result'] < curr['result'].toString().length ? (Array.isArray(curr['result']) ? 4 + Math.max(curr['result'][0].toString().length, curr['result'][1].toString().length)  :curr['result'].toString().length) : newAcc['result'];
              return newAcc;
            }, {1: 1, 2: 1, result: 1});
            return groupSizes;
          })
      } else {
        return [...(new Array(exercices[currLevel].groups.length)).map(() => {return {1: 1, 2: 1, result: 1};})]
      }
    }, [exercices, currLevel])

    console.debug(exercices[currLevel].columns);
    let equationIndexExercice = 0;

    return (<div style={{width: '100%', height: '100%', backgroundColor: backgroundColor, color: '#dddddd',
        fontFamily: 'arial-rounded-mt-bold', fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>
          <div ref={calculsTable} style={{width: '95%', height: '85%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
            {exercices[currLevel].columns.map((column:any, columnIndex:any) => {
              return (<div key={columnIndex} style={{display:'flex', flexDirection: 'column', width: (1/(exercices[currLevel].columns.length)*100).toString()+'%', height: '100%'}}>
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
              </div>)
            })}
          </div>
        <div style={{display: 'flex', justifyContent: 'center',  width: '100%',position: 'absolute', bottom: '5%', height: '5%'}}>
          <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center'}}>
            <ProgressBar value={barValue} color={colors.bar.pink}></ProgressBar>
          </div>
        </div>
    </div>)
}

export default Game;