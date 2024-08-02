import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";

export class Division extends Generator {
    operation: CalcType = 'division';
    filters = [
        (equation: Equation) => equation['2'] !== 0,
    ];
}