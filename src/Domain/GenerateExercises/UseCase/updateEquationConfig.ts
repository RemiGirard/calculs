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
  equationConfig[key] = newValue;
  if(key === 'possibleGaps' && equationList !== null){
    const convertedGaps = equationConfig.getPossibleGaps().map((e) => {
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
    setEquationList(generateEquationList(equationConfig, count));
  }
  setEquationConfig(equationConfig);
};