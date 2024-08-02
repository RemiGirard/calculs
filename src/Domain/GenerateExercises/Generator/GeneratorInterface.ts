import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";
import {NumberRange} from "@/Domain/GenerateExercises/Entity/NumberRange.ts";

export interface GeneratorInterface {
    generate(ranges: NumberRange[], count: number): Equation[]
}