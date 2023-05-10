import React, { useEffect, useState } from 'react';

import useTimer from '../hooks/useTimer';
import ProgressBar from '../components/ProgressBar';
import dictionaryTyped from '../dictionary.json'

const dictionary:any = dictionaryTyped;

const Game = ({exercices, setGameOver, config}: any) => {
    const [currLevel, setCurrLevel] = useState(0);
    const [showResult, setShowResult] = useState(false)
    const rerollLimit = 1000;

    const fontSize = 5

    const colorsGradient = {
        1: ['#ddcccc', '#66cc99'],
        2: ['#ddcccc', '#bc66cc'],
    }

    const backgroundColor = '#022b40';

    const [questionTimeStarted, setQuestionTimeStarted] = useState(true)
    const [questionTimeReset, setQuestionTimeReset] = useState(false)
    const [answerTimeReset, setAnswerTimeReset] = useState(false)
    const [answerTimeStarted, setAnswerTimeStarted] = useState(false)

    let [calculs, setCalculs]:[any, any] = useState([])

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
        setCalculs(newCalculs)
      }

    useEffect(() => {
        generateCalcul()
    }, [])

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

    function integerToLetter(integer:any) {
      if (integer < 1 || integer > 26) {
        return ' ';
      }
      
      // Convert the integer to a character code by adding 64
      var charCode = integer + 96;
      
      // Convert the character code to a letter
      var letter = String.fromCharCode(charCode);
      
      return letter;
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

    const getModuloResultDisplay = (quotient:any, remainder:any) => {
        return (<div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{fontSize: '0.5em'}}>quotient: {quotient}</div>
            <div  style={{fontSize: '0.5em'}}>reste: {remainder}</div>
        </div>)
    }

    const displayCalcElement = (currCalcul:any, element:any, showResult:any) => {
      return (<div
        style={{
          width: element === 'result' && (exercices[currLevel].calcType === '%' || exercices[currLevel].calcType === '/')
            ? '200px'
            : '85px',
          display: 'flex',
          justifyContent: 'center',
          color: currCalcul.gap === element && showResult ? '#00ff06' : '',
          borderRadius: '15px',
          padding: '5px',
          marginLeft: '5px',
        }}>
        {currCalcul.gap !== element || showResult
          ? <>
              {
                  element === 'result' && exercices[currLevel].calcType === '%'
                      ? getModuloResultDisplay(currCalcul.result[0], currCalcul.result[1])
                      : currCalcul[element]
              }
          </>
          : <>..</>
        }
      </div>)
    }
    
    const questionTime = useTimer(exercices[currLevel].questionDuration, () => {handleEndQuestionTime()}, questionTimeStarted, questionTimeReset, setQuestionTimeReset);
    const answerTime = useTimer(exercices[currLevel].answerDuration, () => {handleEndAnswerTime()}, answerTimeStarted, answerTimeReset, setAnswerTimeReset);

    const barValue = questionTimeStarted
    ? (questionTime/exercices[currLevel].questionDuration)*100
    : ((exercices[currLevel].answerDuration-answerTime )/ exercices[currLevel].answerDuration) *100
    return (<div style={{width: '100%', height: '100%', backgroundColor: backgroundColor, color: '#dddddd', fontFamily: 'arial-rounded-mt-bold', fontWeight: 'bold'}}>
        {calculs.length
            ? <div style={{width: '100%', height: '80%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: fontSize+'em'}}>
                {
                    calculs[currLevel].map((calculGroup:any, calculGroupIndex:any)=>{
                        return <div key={calculGroupIndex}>
                            {
                                calculGroup.map((currCalcul:any, index:any) => {
                                  return (<div key={index} style={{display: 'flex', flexDirection: 'row', margin: '10px'}}>
                                      {config.displayLetterId === true 
                                        ? <div style={{color: '#0a4663', fontSize: '0.5em', display: 'flex', alignItems: "flex-end", marginBottom: '10px' }}>{integerToLetter(calculGroupIndex*(calculGroup.length) + (index+1))}. </div>
                                        : null
                                      }
                                      <div style={{display: 'flex', flexDirection: 'row'}}>
                                          {displayCalcElement(currCalcul, 1, showResult)}
                                          {dictionary.calcCharacter[exercices[currLevel].calcType] ?? exercices[currLevel].calcType}
                                          {displayCalcElement(currCalcul, 2, showResult)}
                                      </div>
                                      <div style={{display: 'flex', flexDirection: 'row'}}>
                                        <> = </> 
                                          {displayCalcElement(currCalcul, 'result', showResult)}
                                          </div>
                                  </div>)
                                })
                            }
                        </div>
                    })
                }
            </div>
            : null
        }
        <div style={{display: 'flex', justifyContent: 'center',  width: '100%',position: 'absolute', bottom: '50px'}}>
          <div style={{width: '100%', height: '50px', display: 'flex', justifyContent: 'center'}}>
            <ProgressBar value={barValue}></ProgressBar>
          </div>
        </div>
    </div>)
}

export default Game;