import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";

const randomFactor = 0.8 as const;

export class PositiveSubtraction extends Generator {
    operation: CalcType = 'positiveSubtraction';
    filters = [
        (equation: Equation) => (equation["1"] >= equation["2"]),
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