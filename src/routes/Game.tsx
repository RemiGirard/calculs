import React, { useEffect, useMemo, useRef, useState } from 'react';

import useTimer from '../hooks/useTimer';
import ProgressBar from '../components/ProgressBar';
import dictionaryTyped from '../dictionary.json'
import Equation from '../components/Equation'

const dictionary:any = dictionaryTyped;

const Game = ({exercices, setGameOver, config}: any) => {
    const [currLevel, setCurrLevel] = useState(0);
    const [showResult, setShowResult] = useState(false)
    const rerollLimit = 1000;

    const backgroundColor = '#022b40';

    const [questionTimeStarted, setQuestionTimeStarted] = useState(true)
    const [questionTimeReset, setQuestionTimeReset] = useState(false)
    const [answerTimeReset, setAnswerTimeReset] = useState(false)
    const [answerTimeStarted, setAnswerTimeStarted] = useState(false)

    function getRandomInt(min:any, max:any) {
      return Math.round(Math.random() * (max - min))+ parseInt(min);
  }

  const biggestNumberFirst = (first:any, second:any) => {
      if(first < second){
          [first, second] = [second, first]
      }
      return [first, second];
  }

  function getRandomDivisibleNumbersInRange(min:any, max:any) {

      let randomNumber = 0;
      let isPrime = true;

      // If the random number is prime, generate a new random number
      // and check again until a non-prime number is found
      while (isPrime) {
          randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          isPrime = true;
          for (let i = 2; i < randomNumber; i++) {
            if (randomNumber % i === 0) {
                isPrime = false;
                break;
            }
          }
      }

      // Generate a random divisor of the non-prime number
      let randomDivisor = 0;
      while (randomDivisor === 0 || randomNumber % randomDivisor !== 0 || (randomDivisor === 1 && (Math.random()> 0.2))) {
          randomDivisor = Math.floor(Math.random() * (randomNumber - 1)) + 1;

      }

      // Return both the non-prime number and its random divisor in an array
      return [randomNumber, randomDivisor];
    }

    const numbersCombinaisonAlreadyGenerated = (numbers:any, calculLevel:any) => {
      return !calculLevel.every((calculGroup:any) => calculGroup.every((curr:any) =>  JSON.stringify({...curr}) !== JSON.stringify({...numbers})) === true);
    }

    const getGap = (gapType:any) => {
      switch(gapType){
          case 'result':
              return 'result';
          case 'firstElement':
              return 1;
          case 'secondElement':
              return 2;
          case 'randomOnTheTwoFirstElements':
              return getRandomInt(1, 2);
          case 'randomOnAll':
              return getRandomInt(1, 3) === 3 ? 'result' : getRandomInt(1, 2);
          default:
              return 'result';
      }
    }

    const generateNumbers = ({group, limit, calculLevel, calculGroup, reroll=0}:any):any => {
      let numbers:any = {
          1: getRandomInt(group.min, group.max),
          2: getRandomInt(group.min, group.max),
          result: 0,
          gap: getGap(limit.gap),
      }

      switch(limit.calcType){
          case '+':
              numbers.result = numbers[1]+numbers[2]
              break;
          case '+ x*10':
              numbers[2]=(Math.max(10,Math.round(getRandomInt(limit.calcSpeRange.min, limit.calcSpeRange.max)/10)*10))
              numbers.result = numbers[1]+numbers[2]
              break;
          case '+ x':
              numbers[2]=limit.calcSpeNumber
              numbers.result = numbers[1]+numbers[2]
              break;
          case '-':
              [numbers[1], numbers[2]] = biggestNumberFirst(numbers[1], numbers[2])
              numbers.result = numbers[1] - numbers[2]
              break;
          case '*':
              numbers.result = numbers[1]*numbers[2]
              break;
          case '/':
              [numbers[1], numbers[2]] = biggestNumberFirst(numbers[1], numbers[2])
              numbers.result = parseFloat((numbers[1]/numbers[2]).toFixed(2))
              break;
          case '%':
              [numbers[1], numbers[2]] = biggestNumberFirst(numbers[1], numbers[2])
              numbers.result = [Math.floor(numbers[1]/numbers[2]), numbers[1]%numbers[2]]
              break;
          case '/ int':
              [numbers[1], numbers[2]] = getRandomDivisibleNumbersInRange(group.min, group.max)
              numbers.result = numbers[1]/numbers[2]
              break;
          default:
      }

      if(numbersCombinaisonAlreadyGenerated(numbers, [calculGroup, ...calculLevel]) && reroll < rerollLimit){
          return generateNumbers({...{group, limit, calculLevel,calculGroup, reroll: reroll+1}})
      } else {
          return numbers;
      }
    }

    const generateCalcul = () => {
        const newCalculs:any =[]
        exercices.forEach((limit:any) => {
          let calculLevel:any = [];
          limit.groups.forEach((group:any)=>{
            let calculGroup:any = []
            for(let i=0; i<limit.calcNumber;i++){
              calculGroup.push(structuredClone(generateNumbers(structuredClone({group, limit, calculLevel, calculGroup}))))
            }
            calculLevel.push(calculGroup)
          })
          newCalculs.push(calculLevel)
        });
        return newCalculs
    }

    const [calculs, setCalculs] = useState(generateCalcul())

    

      


    const handleReStartAnswerTime = () => {
        setAnswerTimeReset(true);
        setAnswerTimeStarted(true);
        setShowResult(true)
    }

    const handleReStartQuestionTime = () => {
        setShowResult(false)
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
      duration: exercices[currLevel].questionDuration,
      callback: handleEndQuestionTime,
      started: questionTimeStarted,
      reset: questionTimeReset,
      setReset: setQuestionTimeReset,
      });
    const answerTime = useTimer({
      duration: exercices[currLevel].answerDuration,
      callback: handleEndAnswerTime,
      started: answerTimeStarted,
      reset: answerTimeReset,
      setReset: setAnswerTimeReset,
    });

    const barValue = questionTimeStarted
    ? (questionTime/exercices[currLevel].questionDuration)*100
    : ((exercices[currLevel].answerDuration-answerTime )/ exercices[currLevel].answerDuration) *100

    let granularity = [1, 1];
    if (calculs && calculs[currLevel] && calculs[currLevel][0]){
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
        const widthSize = calculsTable.current.offsetWidth/calculs[currLevel].length;
        const heightSize = calculsTable.current.offsetHeight/calculs[currLevel][0].length;
        // maxTextLength
        const textHeight = 1
        setDynamicFontSize(Math.min(widthSize/(updatedMaxTextLengthForListener.current*12), heightSize/(textHeight*25)))
      }
    }
    
    useEffect(() => {
      if(calculsTable && calculsTable.current){
        calculateFontSize()
        const widthObserver = new ResizeObserver(calculateFontSize);
        widthObserver.observe(calculsTable.current)
        return () => {
          widthObserver.disconnect()
        }
      }
    },[maxTextLength])

    const tableSizes = useMemo(() => {
      if(calculs && calculs[currLevel]){
          return calculs[currLevel].map((calculGroup: any, calculGroupIndex: number)=> {
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
    }, [calculs, currLevel])

    return (<div style={{width: '100%', height: '100%', backgroundColor: backgroundColor, color: '#dddddd',
        fontFamily: 'arial-rounded-mt-bold', fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>
            <div ref={calculsTable} style={{width: '95%', height: '85%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                {
                    exercices[currLevel].groups.map((exercice:any, exerciceIndex:any)=>{
                        let groupSizes = 1;
                        if(calculs && calculs[currLevel] && calculs[currLevel][exerciceIndex]){
                          groupSizes = calculs[currLevel][exerciceIndex].reduce((acc: any, curr: any) => {
                            let newAcc = structuredClone(acc);
                            newAcc[1] = newAcc[1] < curr[1].toString().length ? curr[1].toString().length : newAcc[1];
                            newAcc[2] = newAcc[2] < curr[2].toString().length ? curr[2].toString().length : newAcc[2];
                            newAcc['result'] = newAcc['result'] < curr['result'].toString().length ? (Array.isArray(curr['result']) ? 4 + Math.max(curr['result'][0].toString().length, curr['result'][1].toString().length)  :curr['result'].toString().length) : newAcc['result'];
                            return newAcc;
                          }, {1: 0, 2: 0, result: 0});
                        }
                        return <div key={exerciceIndex} style={{display:'flex', flexDirection: 'column', width: (1/(calculs[currLevel].length)*100).toString()+'%', height: (1/(calculs[currLevel][exerciceIndex].length)*100).toString()+'%', justifyContent: 'center'}}>
                            {
                                [...(new Array(exercices[currLevel].calcNumber))].map((currCalcul:any, index:any) => {
                                  const calculGroup = calculs[currLevel][exerciceIndex];
                                  return (calculs[currLevel][exerciceIndex][index] ? <Equation
                                            key={index}
                                            currCalcul={calculs[currLevel][exerciceIndex][index]}
                                            index={index}
                                            calculGroupIndex={exerciceIndex}
                                            calculGroup={calculGroup}
                                            config={config}
                                            showResult={showResult} calcType={exercices[currLevel].calcType}
                                            updateParentTextSize={updateParentTextSize}
                                            groupSizes={tableSizes[exerciceIndex]}
                                            dynamicFontSize={dynamicFontSize}
                                            />:null);
                                })
                            }
                        </div>
                    })
                }
            </div>
        <div style={{display: 'flex', justifyContent: 'center',  width: '100%',position: 'absolute', bottom: '50px'}}>
          <div style={{width: '100%', height: '50px', display: 'flex', justifyContent: 'center'}}>
            <ProgressBar value={barValue}></ProgressBar>
          </div>
        </div>
    </div>)
}

export default Game;