import Config from "@/Domain/GenerateExercises/Entity/Config.ts";
import {Route, RouterProvider} from "@/Presentation/Router.tsx";
import ConfigContext from "@/Presentation/ConfigContext.ts";
import {useState} from "react";
import GenerateExercises from "@/Presentation/Pages/GenerateExercises.tsx";
import ConfigPage from "@/Presentation/Pages/Config.tsx";
import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";
import defaultExerciseList from "@/Domain/GenerateExercises/Entity/defaultExerciseList.ts";

export default () => {
  const [config, setConfig] = useState(new Config());

  const [exercises, setExercises] = useState<Exercise[]>(defaultExerciseList);
  // const numberOfCalcul = exercises.reduce((acc, exercise) => acc + exercise.columns[0].length, 0);

  return (<ConfigContext.Provider value={config}>
    <RouterProvider>
      <Route name={'generateExercises'} render={() => <GenerateExercises exerciseList={exercises} setExerciseList={setExercises}/>} />
      <Route name={'config'} render={() => <ConfigPage config={config} setConfig={setConfig}/>} />
    </RouterProvider>
  </ConfigContext.Provider>);
};
