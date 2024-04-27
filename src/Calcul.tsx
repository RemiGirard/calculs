import { useState } from 'react';

import { Switch, Case } from './utils/Switch';

import Config from './routes/Config';
import GenerateExercices from './routes/GenerateExercices';
import Game from './routes/Game';
import GameOver from './routes/GameOver';
import { PageName, ConfigInterface, ExerciceConfig } from './routes/ExerciceConfig.types';
import { Exercice } from './routes/Exercice.type';
import dictionary from './dictionary.json';
import Interactive from './routes/Interactive';
import Tensorflow from "./routes/Tensorflow";
import TensorflowV2 from "./routes/TensorflowV2";

const isDevEnv: boolean = (process.env.NODE_ENV === 'development');

const Calcul = () => {
  const [currState, setCurrState] = useState<PageName>('tensorflowV2');
  const pageConfig = () => setCurrState('config');
  const pageGenerateExercices = () => setCurrState('generateExercices');
  const pageGame = () => setCurrState('started');
  const pageGameOver = () => setCurrState('finish');

  const [config, setConfig] = useState<any>({
    displayLetterId: {value: true, type: 'boolean'},
  });

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
      <Case value={'interactive'}>
        <Interactive
          {...{  }}
        />
      </Case>
      <Case value={'tensorflow'}>
          <Tensorflow />
      </Case>
      <Case value={'tensorflowV2'}>
        <TensorflowV2 />
      </Case>
    </Switch>
  );
};

export default Calcul;