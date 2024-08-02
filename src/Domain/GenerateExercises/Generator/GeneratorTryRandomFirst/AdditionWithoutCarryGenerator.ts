import {Filter} from "@/Domain/GenerateExercises/Entity/Filter";
import {eachDigitAdditionIsInferiorToTen} from "@/utils/number.tsx";
import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypes.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";

export class AdditionWithoutCarryGenerator extends Generator {
    operation: CalcType = 'additionWithoutCarry';
    filters: Filter[] = [
        (equation: Equation) => {
            return eachDigitAdditionIsInferiorToTen([equation["1"], equation["2"]]);
        },
    ];
}