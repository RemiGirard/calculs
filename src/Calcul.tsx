import { useState } from 'react';

import { Switch, Case } from './utils/Switch';

import Config from './routes/Config';
import GenerateExercices from './routes/GenerateExercices';
import Game from './routes/Game';
import GameOver from './routes/GameOver';
import { PageName, ConfigInterface, ExerciceConfig } from './routes/ExerciceConfig.types';
import { Exercice } from './routes/Exercice.type';
import dictionary from './dictionary.json';

const isDevEnv: boolean = (process.env.NODE_ENV === 'development');

const Calcul = () => {
  const [currState, setCurrState] = useState<PageName>('generateExercices');
  const pageConfig = () => setCurrState('config');
  const pageGenerateExercices = () => setCurrState('generateExercices');
  const pageGame = () => setCurrState('started');
  const pageGameOver = () => setCurrState('finish');

  const [config, setConfig] = useState<any>({
    displayLetterId: {value: true, type: 'boolean'},
  });
  console.debug({config})

  const [exercices, setExercices] = useState<Exercice[]>([]);
  const numberOfCalcul = exercices.reduce((acc, exercice) => acc + exercice.columns[0].length, 0);
  
  return (
    <Switch expression={currState}>
      <Case value={'config'}>
        <Config
          title={dictionary.titles.config}
          {...{
            pageGenerateExercices,
            config,
            setConfig,
          }}
        />
      </Case>
      <Case value={'generateExercices'}>
        <GenerateExercices
          title={dictionary.titles.generateExercices}
          {...{
            pageGame,
            pageConfig,
            setExercices,
            config,
          }}
        />
      </Case>
      <Case value={'started'}>
        <Game
          {...{
            exercices,
            pageGameOver,
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