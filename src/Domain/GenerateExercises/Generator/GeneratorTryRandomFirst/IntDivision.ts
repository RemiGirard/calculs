import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";

export class IntDivision extends Generator {
    operation: CalcType = 'intDivision';
    filters = [
        (equation: Equation) => equation['2'] !== 0,
        (equation: Equation) => Number.isInteger(equation.result),
    ];
}