import {ModuloResult} from "@/Domain/Equation.ts";

export default {
    addition:       (first:number, second:number):number => first + second,
    additionWithoutCarry: (first:number, second:number):number => first + second,
    soustraction: (first:number, second:number):number => first - second,
    positiveSoustraction:   (first:number, second:number):number => first - second,
    positiveSoustractionWithoutCarry: (first:number, second:number):number => first - second,
    multiplication: (first:number, second:number):number => first * second,
    division:       (first:number, second:number):number => Number((first / second).toFixed(2)),
    intDivision:  (first:number, second:number):number => first / second,
    modulo:         (first:number, second:number):ModuloResult => {
        const quotient = Math.floor(first/second);
        const remainder = first % second;
        return {quotient, remainder};
    },
};