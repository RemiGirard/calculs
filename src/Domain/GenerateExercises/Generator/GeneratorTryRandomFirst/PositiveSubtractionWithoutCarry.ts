import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";
import {eachDigitSubtractionIsPositive} from "@/utils/number/number.ts";

const randomFactor = 0.8 as const;

export class PositiveSubtractionWithoutCarry extends Generator {
    operation: CalcType = 'positiveSubtractionWithoutCarry';
    filters = [
        (equation: Equation) => (equation['1'] >= equation['2']),
        (equation: Equation) => eachDigitSubtractionIsPositive(equation['1'], equation['2']),
    ];
    randomFilters = [
      (equation: Equation) => {
        if(equation['1'] === equation['2']){
          return Math.random() > randomFactor;
        }
        return true;
      },
    ];
}