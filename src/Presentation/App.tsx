import Config from "@/Domain/Config.ts";
import {Route, RouterProvider} from "@/Presentation/Router.tsx";
import ConfigContext from "@/Presentation/ConfigContext.ts";
import {useState} from "react";
import GenerateExercices from "@/Presentation/Pages/GenerateExercices.tsx";
import ConfigPage from "@/Presentation/Pages/Config.tsx";
import Exercise from "@/Domain/Exercice.ts";

export default () => {
  const [config, setConfig] = useState(new Config());

  const [exercises, setExercises] = useState<Exercise[]>([]);
  // const numberOfCalcul = exercises.reduce((acc, exercise) => acc + exercise.columns[0].length, 0);

  return (<ConfigContext.Provider value={config}>
    <RouterProvider>
      <Route name={'generateExercises'} render={() => <GenerateExercices exercices={exercises} setExercices={setExercises}/>} />
      <Route name={'config'} render={() => <ConfigPage config={config} setConfig={setConfig}/>} />
    </RouterProvider>
  </ConfigContext.Provider>);
};
