import {shuffleArray} from "@/utils/utils.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";
import EquationConfig from "@/Domain/GenerateExercises/Entity/EquationConfig.ts";
import {AdditionGenerator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/AdditionGenerator.ts";
import {
  AdditionWithoutCarryGenerator
} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/AdditionWithoutCarryGenerator.ts";

export const generatePossibleEquations = (equationConfig: EquationConfig, equationCount: number):Equation[] => {
  let equations: Equation[] = [];

  if(equationConfig.type === 'addition') {
    equations = (new AdditionGenerator).generate([equationConfig.first, equationConfig.second], equationCount);
  } else if(equationConfig.type === 'additionWithoutCarry') {
    equations = (new AdditionWithoutCarryGenerator).generate([equationConfig.first, equationConfig.second], equationCount);
  } else {
    // @TODO: add others, not error all cases will be implemented
  }

  return equations.map((equation) => {
    equation.calculateResult();
    const convertedGaps = equationConfig.getPossibleGaps().map((e) => {
      return ({
        first: '1',
        second: '2',
        result: 'result',
      } as const)[e];
    });
    equation.applyRandomGap(convertedGaps);
    return equation;
  });
}

export const generateColumn = (config: EquationConfig, equationCount: number): Equation[] => {
  return shuffleArray(generatePossibleEquations(config, equationCount));
};
