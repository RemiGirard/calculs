import {useState} from 'react';

import Config from '@/Domain/GenerateExercises/Entity/Config.ts';
import defaultExerciseList from '@/Domain/GenerateExercises/Entity/defaultExerciseList.ts';
import Exercise from '@/Domain/GenerateExercises/Entity/Exercise.ts';

import { Route, RouterProvider } from '@/Presentation/Router.tsx';
import ConfigContext from '@/Presentation/ConfigContext.ts';
import GenerateExercises from '@/Presentation/Pages/GenerateExercises.tsx';
import ConfigPage from '@/Presentation/Pages/Config.tsx';
import generateEquations from "@/Domain/GenerateExercises/UseCase/generateEquations.ts";

export default function () {
  const [config, setConfig] = useState(new Config());

  const [exerciseList, setExerciseList] = useState<Exercise[]>(defaultExerciseList);
  // const numberOfCalcul = exercises.reduce((acc, exercise) => acc + exercise.columns[0].length, 0);

  const setExerciseListConfig = (exerciseList: Exercise[]) => {
    let newExerciseList: Exercise[] = [];
    generateEquations(exerciseList, (newValue)=> newExerciseList = newValue);
    setExerciseList(newExerciseList);
  };

  return (
    <ConfigContext.Provider value={config}>
      <RouterProvider>
        <Route name="generateExercises" render={() => <GenerateExercises exerciseList={exerciseList} setExerciseList={setExerciseListConfig} />} />
        <Route name="config" render={() => <ConfigPage config={config} setConfig={setConfig} />} />
      </RouterProvider>
    </ConfigContext.Provider>
  );
}
