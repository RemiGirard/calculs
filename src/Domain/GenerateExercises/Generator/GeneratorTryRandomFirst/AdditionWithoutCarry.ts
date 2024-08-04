import {eachDigitAdditionIsInferiorToTen} from "@/utils/number/number.ts";
import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";

export class AdditionWithoutCarry extends Generator {
    operation: CalcType = 'additionWithoutCarry';
    filters = [
        (equation: Equation) => {
            return eachDigitAdditionIsInferiorToTen([equation["1"], equation["2"]]);
        },
    ];
}