import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";

export class PositiveSubtraction extends Generator {
    operation: CalcType = 'positiveSubtraction';
    filters = [
        (equation: Equation) => (equation["1"] >= equation["2"]),
    ];
}