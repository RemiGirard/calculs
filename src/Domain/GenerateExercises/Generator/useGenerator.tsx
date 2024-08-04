import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";
import EquationConfig from "@/Domain/GenerateExercises/Entity/EquationConfig.ts";
import {Addition} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Addition";
import {
  AdditionWithoutCarry
} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/AdditionWithoutCarry";
import {Subtraction} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Subtraction.ts";
import {PositiveSubtraction} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/PositiveSubtraction.ts";
import {Multiplication} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Multiplication.ts";
import {Division} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Division.ts";
import {IntDivision} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/IntDivision.ts";
import {Modulo} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Modulo.ts";
import {CalcType} from "../Entity/CalcTypeList.ts";
import {GeneratorType} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {
  PositiveSubtractionWithoutCarry
} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/PositiveSubtractionWithoutCarry.ts";

export const generateEquationList = (equationConfig: EquationConfig, equationCount: number):Equation[] => {

  const typeGeneratorTable: {[K in CalcType]: GeneratorType } = {
    addition: Addition,
    additionWithoutCarry: AdditionWithoutCarry,
    subtraction: Subtraction,
    positiveSubtraction: PositiveSubtraction,
    positiveSubtractionWithoutCarry: PositiveSubtractionWithoutCarry,
    multiplication: Multiplication,
    division: Division,
    intDivision: IntDivision,
    modulo: Modulo,
  };

  const generator = new typeGeneratorTable[equationConfig.type]();
  const equationList: Equation[] = generator.generate([equationConfig.first, equationConfig.second], equationCount);

  return equationList.map((equation) => {
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
};
