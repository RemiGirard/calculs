import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";

export class Modulo extends Generator {
    operation: CalcType = 'modulo';
}