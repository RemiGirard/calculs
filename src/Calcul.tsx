import { useState } from 'react';

import { Switch, Case } from './utils/Switch';

import Config from './routes/Config';
import GenerateExercices from './routes/GenerateExercices';
import Game from './routes/Game';
import GameOver from './routes/GameOver';
import { PageName, ConfigInterface, ExerciceConfig } from './routes/GenerateExercice.types';
import { Exercice } from './routes/Exercice.type';
import dictionary from './dictionary.json';

const isDevEnv: boolean = (process.env.NODE_ENV === 'development');

const Calcul = () => {
  const [currState, setCurrState] = useState<PageName>('generateExercices');
  const setStateConfig = () => setCurrState('config');
  const setStateGenerateExercices = () => setCurrState('generateExercices');
  const setGameStarted = () => setCurrState('started');
  const setGameOver = () => setCurrState('finish');

  const [config, setConfig] = useState<ConfigInterface>({
    displayLetterId: true,
  });

  const defaultExercice: ExerciceConfig = {
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

  const [sessionConfig, setSessionConfig] = useState<ExerciceConfig[]>([defaultExercice]);

  const [exercices, setExercices] = useState<Exercice[]>([]);

  const numberOfCalcul = exercices.reduce((acc, exercice) => acc + exercice.columns[0].length, 0);
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
        <GenerateExercices
          title={dictionary.titles.generateExercices}
          {...{
            sessionConfig,
            setSessionConfig,
            setGameStarted,
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
          {...{ numberOfCalcul }}
        />
      </Case>
    </Switch>
  );
};

export default Calcul;