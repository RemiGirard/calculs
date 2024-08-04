import {setter} from "@/utils/Type/setter.ts";
import EquationConfig from "@/Domain/GenerateExercises/Entity/EquationConfig.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";
import {generateEquationList} from "@/Domain/GenerateExercises/Generator/useGenerator.tsx";

export default <K extends keyof EquationConfig>(
  equationConfig: EquationConfig,
  setEquationConfig: setter<EquationConfig>,
  newValue: EquationConfig[K],
  key: K,
  count: number,
  equationList: Equation[]|null,
  setEquationList: setter<Equation[]>,
) => {
  const newEquationConfig = equationConfig.getCopy();
  newEquationConfig[key] = newValue;
  setEquationConfig(newEquationConfig);
  if(key === 'possibleGaps' && equationList !== null){
    const convertedGaps = newEquationConfig.getPossibleGaps().map((e) => {
      return ({
        first: '1',
        second: '2',
        result: 'result',
      } as const)[e];
    });
    setEquationList(equationList.map((equation) => {
      equation.applyRandomGap(convertedGaps);
      return equation
    }));
  } else {
    setEquationList(generateEquationList(newEquationConfig, count));
  }
};