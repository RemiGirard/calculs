import {useState} from 'react';

import Config from '@/Domain/GenerateExercises/Entity/Config.ts';
import defaultExerciseList from '@/Domain/GenerateExercises/Entity/defaultExerciseList.ts';
import Exercise from '@/Domain/GenerateExercises/Entity/Exercise.ts';
import { Route, RouterProvider } from '@/Presentation/Router.tsx';
import ConfigContext from '@/Presentation/ConfigContext.ts';
import GenerateExercises from '@/Presentation/Pages/GenerateExercises.tsx';
import ConfigPage from '@/Presentation/Pages/Config.tsx';

export default function () {
  const [config, setConfig] = useState(new Config());
  const [exerciseList, setExerciseList] = useState<Exercise[]>(defaultExerciseList);


  return (
    <ConfigContext.Provider value={config}>
      <RouterProvider>
        <Route name="generateExercises" render={() => <GenerateExercises exerciseList={exerciseList} setExerciseList={setExerciseList} />} />
        <Route name="config" render={() => <ConfigPage config={config} setConfig={setConfig} />} />
      </RouterProvider>
    </ConfigContext.Provider>
  );
}
