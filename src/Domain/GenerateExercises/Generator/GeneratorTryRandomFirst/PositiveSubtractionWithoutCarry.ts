import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";
import {eachDigitSubtractionIsPositive} from "@/utils/number.tsx";

export class PositiveSubtractionWithoutCarry extends Generator {
    operation: CalcType = 'positiveSubtractionWithoutCarry';
    filters = [
        (equation: Equation) => (equation['1'] >= equation['2']),
        (equation: Equation) => eachDigitSubtractionIsPositive(equation['1'], equation['2']),
    ];
}