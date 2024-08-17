import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";

const randomFactor = 0.8 as const;

export class Division extends Generator {
    operation: CalcType = 'division';
    filters = [
        (equation: Equation) => equation['2'] !== 0,
    ];
  randomFilters = [
    (equation: Equation) => {
      if(equation['2'] === 1 || equation['1'] === equation['2']){
        return Math.random() > randomFactor;
      }
      return true;
    },
  ];
}