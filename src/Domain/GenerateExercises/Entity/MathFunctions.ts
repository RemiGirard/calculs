import {ModuloResult} from "@/Domain/GenerateExercises/Entity/Equation.ts";

export default {
    addition:       (first:number, second:number):number => first + second,
    additionWithoutCarry: (first:number, second:number):number => first + second,
    subtraction: (first:number, second:number):number => first - second,
    positiveSubtraction:   (first:number, second:number):number => first - second,
    positiveSubtractionWithoutCarry: (first:number, second:number):number => first - second,
    multiplication: (first:number, second:number):number => first * second,
    division:       (first:number, second:number):number => Number((first / second).toFixed(2)),
    intDivision:  (first:number, second:number):number => first / second,
    modulo:         (first:number, second:number):ModuloResult => {
        const quotient = Math.floor(first/second);
        const remainder = first % second;
        return {quotient, remainder};
    },
};