import {NumberRange, numberRangeTypes} from "@/Domain/GenerateExercises/Entity/NumberRange";
import {Filter} from "@/Domain/GenerateExercises/Entity/Filter";
import Equation from "@/Domain/GenerateExercises/Entity/Equation";
import {MaxRerollReachedIncludesError} from "@/Domain/GenerateExercises/Error/MaxRerollReachedIncludesError";
import {MaxRerollReachedFiltersError} from "@/Domain/GenerateExercises/Error/MaxRerollReachedFiltersError";

import {shuffleArray} from "@/utils/utils.ts";
import {combinePossibilities} from "@/utils/combinePossibilities.ts";
import {GeneratorInterface} from "@/Domain/GenerateExercises/Generator/GeneratorInterface";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";

export type GeneratorType = typeof Generator;
export class Generator implements GeneratorInterface{
    protected filters: Filter[] = [];
    protected maxRerollIncludes = 100;
    protected maxRerollFilters = 100;
    protected operation: CalcType = 'addition';

    protected possibilitiesGenerator: {[key in typeof numberRangeTypes[number]] : (r: NumberRange) => number[]} = {
        fix: (range: NumberRange) => {
            if(range.type !== "fix") throw new Error('Fix is undefined');
            return [range.fix];
        },
        range: (range: NumberRange) => {
            if(range.type !== "range") throw new Error('Range min or max is undefined');
            const possibilities: number[] = [];
            for(let i=range.min;i<=range.max;i++){
                possibilities.push(i);
            }
            return possibilities;
        },
        rangeTens: (range: NumberRange) => {
            if(range.type !== "rangeTens") throw new Error('Range min or max is undefined');
            const possibilities: number[] = [];
            const min = Math.ceil(Math.max(range.min, 10)/10)*10;
            for(let i=min;i<=range.max;i+=10){
                possibilities.push(i);
            }
            return possibilities;
        },
    }
    protected generateRangePossibilities(range: NumberRange) {
        try {
            return this.possibilitiesGenerator[range.type](range);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    protected generateAll(ranges: NumberRange[]): Equation[] {
        const possibilities: number[][] = [];
        ranges.forEach((range) => {
            possibilities.push(this.generateRangePossibilities(range));
        });

        return combinePossibilities(possibilities)
            .map((possibility) => new Equation({
                first: possibility[0],
                second: possibility[1],
                operation: this.operation,
            }))
            .filter((equation) => !this.filters.some(filter => filter(equation)))
        ;
    }

    protected generateRandomFromRandom(range: NumberRange): number {
        try {
            const randomPossibilitiesGenerator: {[key in NumberRange['type']] : (r: NumberRange) => number} = {
                fix: (range: NumberRange) => {
                    if(range.type !== "fix") throw new Error('Fix is undefined');
                    return range.fix;
                },
                range: (range: NumberRange) => {
                    if(range.type !== "range") throw new Error('Range min or max is undefined');
                    return range.min + Math.floor(Math.random() * (range.max - range.min + 1));
                },
                rangeTens: (range: NumberRange) => {
                    if(range.type !== "rangeTens") throw new Error('Range min or max is undefined');
                    const min = Math.ceil(Math.max(range.min, 10)/10)*10;
                    return min + Math.floor(Math.random() * (range.max - min + 1));
                }
            };
            return randomPossibilitiesGenerator[range.type](range);
        } catch (e) {
            console.error(e);
            return 1;
        }
    }

    private hasSameEquation(equation: Equation, equations: Equation[]): boolean {
        return equations.some(e => e[1] === equation[1] && e[2] === equation[2]);
    }

    protected generateRandom(ranges: NumberRange[], count: number): Equation[] {
        const equations: Equation[] = [];
        for(let i = 0; i < count; i++) {
            let equation: Equation;
            let included: boolean;
            let filtered: boolean;
            let currentRerollIncludes = 0;
            let currentFiltersReroll = 0;
            do {
                const operands = ranges.map(this.generateRandomFromRandom);
                equation = new Equation({
                    first: operands[0],
                    second: operands[1],
                    operation: this.operation,
                });
                filtered = this.filters.length > 0 ? !this.filters.every(filter => filter(equation)) : false;
                currentFiltersReroll += filtered ? 1 : 0;
                included = filtered ? false : this.hasSameEquation(equation, equations);
                currentRerollIncludes = included ? currentRerollIncludes+1 : 0;
                if (currentRerollIncludes >= this.maxRerollIncludes) {
                    throw new MaxRerollReachedIncludesError();
                }
                if(currentFiltersReroll >= this.maxRerollFilters) {
                    throw new MaxRerollReachedFiltersError();
                }
            } while (
                equation === undefined
                || included
                || filtered
                )

            equations.push(equation);
        }

        return equations;
    }

    public generate(ranges: NumberRange[], count: number): Equation[] {
        try {
            return this.generateRandom(ranges, count);
        } catch (e) {
            if (e instanceof MaxRerollReachedIncludesError || e instanceof MaxRerollReachedFiltersError) {
                return shuffleArray(this.generateAll(ranges)).slice(0, count);
            }
            throw e;
        }
    }
    // let equations: EquationInterface[] = [];
    // const forbidNegativeResults = ['positiveSoustraction', 'positiveSoustractionWithoutCarry','division','intDivision','modulo'].includes(columnConfig.type);
    // const forbidNonIntResults = ['intDivision'].includes(columnConfig.type);
    // const forbidQuotientZeroResults = ['modulo'].includes(columnConfig.type);
    // const forbidAdditionCarry = ['additionWithoutCarry'].includes(columnConfig.type);
    // const forbidSoustractionCarry = ['soustractionWithoutCarry', 'positiveSoustractionWithoutCarry'].includes(columnConfig.type);


    // possibilities.forEach((possibility) => {
    //   if(
    //     (!forbidNegativeResults || (typeof equation.result !== 'number' || equation.result >=0) )
    //     && (!forbidNonIntResults ||(typeof equation.result !== 'number' || Number.isInteger(equation.result)))
    //     && (!forbidQuotientZeroResults || (typeof equation.result === 'number' || equation.result.quotient !== 0))
    //     // && (!forbidAdditionCarry || (typeof equation.result !== 'number' || eachDigitAdditionIsInferiorToTen(equation[1], equation[2])))
    //     && (!forbidSoustractionCarry || (typeof equation.result !== 'number' || eachDigitSoustractionIsPositive(equation[1], equation[2])))
    //   ){
    //     equations.push(equation);
    //   }
    // });
}