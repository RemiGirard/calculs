import {Generator} from "@/Domain/GenerateExercises/Generator/GeneratorTryRandomFirst/Generator.ts";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypes.ts";

export class AdditionGenerator extends Generator {
    operation: CalcType = 'addition';
}