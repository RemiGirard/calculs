import { useState } from 'react';

import { Switch, Case } from './utils/Switch';

import dictionary from './dictionary.json'

import Config from './routes/Config';
import LimitChoice from './routes/GenerateExercices';
import Game from './routes/Game';
import GameOver from './routes/GameOver';
import { PageName, ConfigInterface, Columns, ExerciceConfig } from './Calcul.types';
import GenerateExercicesV2 from './routes/GenerateExercicesV2';

const isDevEnv:boolean = (process.env.NODE_ENV === 'development');

const Calcul = () => {
  const [currState, setCurrState] = useState<PageName>('generateExercicesV2');
  const setStateConfig = () => setCurrState('config');
  const setStateGenerateExercices = () => setCurrState('generateExercicesV2');
  const setGameStarted = () => setCurrState('started');
  const setGameOver = () => setCurrState('finish');

  const defaultExerciceV2:ExerciceConfig = {
    questionTime: isDevEnv ? 5 : 180,
    answerTime: isDevEnv ? 5 : 60,
    equationCount: 6,
    columns: [{
      type: 'addition',
      1: {
        type: 'range',
        min: 1,
        max: 9,
      },
      2: {
        type: 'range',
        min: 1,
        max: 9,
      },
      answer: {
        1: false,
        2: false,
        result: true,
      }
    }],
  };

  const [sessionConfig, setSessionConfig] = useState<ExerciceConfig[]>([defaultExerciceV2]);

  const [config, setConfig] = useState<ConfigInterface>({
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

  const [exercices, setExercices] = useState([]);

  const numberOfCalcul = exercices.reduce((acc, exercice:any) => acc + exercice.calcNumber, 0);

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
      <Case value={'generateExercicesV2'}>
        <GenerateExercicesV2
          title={dictionary.titles.generateExercices}
          {...{
            sessionConfig,
            setSessionConfig,
            setGameStarted,
            exercices,
            setExercices,
            config,
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