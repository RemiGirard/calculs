import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";

export class Subtraction extends Generator {
    operation: CalcType = 'subtraction';
}