import React, { useState } from "react";

import lodash from "lodash";

import './Calcul.css'

import dictionary from '../dictionary.json'
import { Switch, Case } from "./utils/Switch";

import LimitChoice from "./LimitChoice";
import Game from "./Game";
import GameOver from "./GameOver";


const Calcul = ({env, options = {displayLetterId: true}}) => {
  // todo: detect environment
  // console.log({NODE_ENV: process.env.NODE_ENV})
  // console.log({env: process.env.env})
  // console.log({CHOKIDAR_USEPOLLING: process.env.CHOKIDAR_USEPOLLING})
  const [currState, setCurrState] = useState('config')

  const defaultGroup = { min: 1, max: 9 }
  const defaultSpeRange = { min: 10, max: 50 }
  const defaultCalcSpeNumber = 1;

  const columns = [
    {
      name: 'groups',
      field: 'groups',
      default: [{ ...defaultGroup }, { ...defaultGroup }]
    }, {
      name: 'calcType',
      field: 'calcType',
      choices: ['+', '+ x*10', '+ x', '-', '*', '/', '/ int', '%'],
      default: '+'
    }, {
      name: 'calcNumber',
      field: 'number',
      default: 6
    }, {
      name: 'difficulty',
      field: 'select',
      choices: [1, 2],
      default: 1
    }, {
      name: 'questionDuration',
      field: 'time',
      default: env === 'test' ? 5 : 180
    }, {
      name: 'answerDuration',
      field: 'time',
      default: env === 'test' ? 300 : 60
    } , {
      name: 'gap',
      field: 'select',
      choices: ['result' , 'firstElement', 'secondElement', 'randomOnTheTwoFirstElements', 'randomOnAll'],
      default: 'result',
    }
  ];

  let defaultExercice = {
    calcSpeRange: defaultSpeRange,
    calcSpeNumber: defaultCalcSpeNumber
  };

  columns.forEach((column) => defaultExercice[column.name] = column.default)
  const [exercices, setExercices] = useState([defaultExercice]);
  const defaultExerciceUpdated = lodash.cloneDeep(exercices[exercices.length-1])
  const calculsTotal = exercices.reduce((acc, curr) => acc + curr.calcNumber, 0);

  const setGameOver = () => setCurrState('over');
  const setGameStarted = () => setCurrState('started');

  return (
    <Switch expression={currState}>
      <Case value={'config'}>
        <LimitChoice
          title={dictionary.titles.config ?? 'config'}
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
          title={dictionary.titles.game ?? 'game'}
          {...{
            limits: exercices,
            setGameOver,
            options
          }}
        />
      </Case>
      <Case value={'over'}>
        <GameOver title={dictionary.titles.gameover ?? 'game over'} numberOfCalcul={calculsTotal} />
      </Case>
    </Switch>
  );
}

export default Calcul;