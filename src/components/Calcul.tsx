import { useState } from "react";

import { Switch, Case } from "./utils/Switch";
import {times} from './utils/utils';

import dictionary from '../dictionary.json'

import Config from "./Config";
import LimitChoice from "./GenerateExercices";
import Game from "./Game";
import GameOver from "./GameOver";

const Calcul = () => {
  const [currState, setCurrState] = useState('generateExercices')
  
  const isDevEnv = process.env.NODE_ENV === 'development';

  const [config, setConfig] = useState({
    default: {
      numberOfGroup: 2,
      group: {min: 1, max: 9},
      calcSpeRange: { min: 10, max: 50 },
      calcSpeNumber: { min: 10, max: 50 },
      calcType: '+',
      calcNumber: 6,
      difficulty: 1,
      questionDuration: isDevEnv ? 5 : 180,
      answerDuration: isDevEnv ? 5 : 60,
      gap: 'result',
    },
    displayLetterId: true,
  });

  let defaultGroups: any[] = [];
  times(config.default.numberOfGroup, () => defaultGroups.push({...config.default.group}))

  const columns = [
    {
      name: 'groups',
      field: 'groups',
      default: defaultGroups,
    }, {
      name: 'calcType',
      field: 'calcType',
      choices: ['+', '+ x*10', '+ x', '-', '*', '/', '/ int', '%'],
      default: config.default.calcType,
    }, {
      name: 'calcNumber',
      field: 'number',
      default: config.default.calcNumber,
    }, {
      name: 'difficulty',
      field: 'select',
      choices: [1, 2],
      default: config.default.difficulty
    }, {
      name: 'questionDuration',
      field: 'time',
      default: config.default.questionDuration
    }, {
      name: 'answerDuration',
      field: 'time',
      default: config.default.answerDuration
    } , {
      name: 'gap',
      field: 'select',
      choices: ['result' , 'firstElement', 'secondElement', 'randomOnTheTwoFirstElements', 'randomOnAll'],
      default: config.default.gap,
    }
  ];

  let defaultExercice : any = {
    calcSpeRange: config.default.calcSpeRange,
    calcSpeNumber: config.default.calcSpeNumber
  };
  columns.forEach((column) => defaultExercice[column.name] = column.default)

  const [exercices, setExercices] = useState([defaultExercice]);

  const defaultExerciceUpdated = structuredClone(exercices[exercices.length-1])
  const numberOfCalcul = exercices.reduce((acc, curr) => acc + curr.calcNumber, 0);

  const setStateConfig = () => setCurrState('config');
  const setStateGenerateExercices = () => setCurrState('generateExercices');
  const setGameStarted = () => setCurrState('started');
  const setGameOver = () => setCurrState('finish');

  return (
    <Switch expression={currState}>
      <Case value={'config'}>
        <Config
        title={dictionary.titles.config}
        {...{
          setStateGenerateExercices,
          config,
          setConfig,
        }}
        />
      </Case>
      <Case value={'generateExercices'}>
        <LimitChoice
          title={dictionary.titles.generateExercices}
          {...{
            exercices,
            setExercices,
            defaultExerciceUpdated,
            columns,
            setGameStarted,
          }}
        />
      </Case>
      <Case value={'started'}>
        <Game
          {...{
            exercices,
            setGameOver,
            config,
          }}
        />
      </Case>
      <Case value={'finish'}>
        <GameOver
          title={dictionary.titles.gameover}
          {...{numberOfCalcul}}
        />
      </Case>
    </Switch>
  );
}

export default Calcul;