import {
    NumberRange,
    numberRangeTypes,
} from "@/Domain/GenerateExercises/Entity/NumberRange";
import {Filter} from "@/Domain/GenerateExercises/Entity/Filter";
import Equation from "@/Domain/GenerateExercises/Entity/Equation";

import shuffleArray from "@/utils/array/shuffleArray.ts";
import {combinePossibilities} from "@/utils/array/combinePossibilities.ts";
import {GeneratorInterface} from "@/Domain/GenerateExercises/Generator/GeneratorInterface";
import {CalcType} from "@/Domain/GenerateExercises/Entity/CalcTypeList.ts";
import {WrongRangeTypeError} from "@/Domain/GenerateExercises/Error/WrongRangeTypeError.ts";

export type GeneratorType = typeof Generator;
export class Generator implements GeneratorInterface {
    protected filters: Filter[] = [];
    protected randomFilters: Filter[] = [];
    protected maxRerollIncludes = 100;
    protected maxRerollFilters = 100;
    protected operation: CalcType = 'addition';

    protected possibilitiesGenerator: {[key in typeof numberRangeTypes[number]] : (r: NumberRange) => number[]} = {
        fix: (range: NumberRange) => {
            if(range.type !== "fix") throw new WrongRangeTypeError('fix', range.type);
            return [range.fix];
        },
        range: (range: NumberRange) => {
            if(range.type !== "range") throw new WrongRangeTypeError('range', range.type);
            const possibilities: number[] = [];
            for(let i=range.min;i<=range.max;i++){
                possibilities.push(i);
            }
            return possibilities;
        },
        rangeTens: (range: NumberRange) => {
            if(range.type !== "rangeTens") throw new WrongRangeTypeError('rangeTens', range.type);
            const possibilities: number[] = [];
            const min = Math.ceil(Math.max(range.min, 10)/10)*10;
            for(let i=min;i<=range.max;i+=10){
                possibilities.push(i);
            }
            return possibilities;
        },
    }

    protected generateRangePossibilities(range: NumberRange): number[] {
        return this.possibilitiesGenerator[range.type](range);
    }

    protected generateAll(ranges: [NumberRange, NumberRange]): Equation[] {
        const possibilities: number[][] = ranges.map((range) => {
            return this.generateRangePossibilities(range);
        });

        return combinePossibilities(possibilities)
            .map((possibility) => new Equation({
                first: possibility[0],
                second: possibility[1],
                operation: this.operation,
            }))
            .filter((equation) => this.filters.every(filter => filter(equation)))
        ;
    }

    protected generateRandomFromRandom(range: NumberRange): number|null {
        const rangeTypeTable = ({
            fix: (range: NumberRange) => {
                if(range.type !== "fix") throw new WrongRangeTypeError('fix', range.type);
                return range.fix;
            },
            range: (range: NumberRange) => {
                if(range.type !== "range") throw new WrongRangeTypeError('range', range.type);
                if(range.min > range.max) {
                    console.log('Range min is superior to max');
                    return null
                }
                return range.min + Math.floor(Math.random() * (range.max - range.min + 1));
            },
            rangeTens: (range: NumberRange) => {
                if(range.type !== "rangeTens") throw new WrongRangeTypeError('rangeTens', range.type);
                if(range.min > range.max) {
                    console.log('Range min is superior to max');
                    return null;
                }
                const [rMin, rMax] = [range.min, range.max].map((v) => Math.floor(Math.max(v, 10)/10));
                return (rMin + Math.floor(Math.random() * (rMax - rMin + 1 )))*10;
            }
        });

        return rangeTypeTable[range.type](range);
    }

    private hasSameEquation(equation: Equation, equations: Equation[]): boolean {
        return equations.some(e => e[1] === equation[1] && e[2] === equation[2]);
    }

    protected generateRandom(ranges: [NumberRange, NumberRange], count: number): Equation[] {
        const equations: Equation[] = [];

        for(let i = 0; i < count; i++) {
            let equation: Equation|undefined = undefined;
            let included: boolean = false;
            let filtered: boolean = false;
            let currentRerollIncludes = 0;
            let currentFiltersReroll = 0;
            do {
                const operands = ranges.map(this.generateRandomFromRandom);
                if(operands[0] === null || operands[1] === null) {
                    console.log('Could not generate random operands');
                    break;
                }
                const currentEquation = new Equation({
                    first: operands[0],
                    second: operands[1],
                    operation: this.operation,
                });
                equation = currentEquation;
                filtered = this.filters.length > 0 ? (
                  !this.filters.every(filter => filter(currentEquation))
                  || !this.randomFilters.every(filter => filter(currentEquation))
                ) : false;
                included = filtered ? false : this.hasSameEquation(currentEquation, equations);
                if(filtered) currentFiltersReroll++;
                if(included) currentRerollIncludes++;
                if (currentRerollIncludes >= this.maxRerollIncludes) {
                    console.log('Max reroll reached includes');
                    break;
                }
                if (currentFiltersReroll >= this.maxRerollFilters) {
                    console.log('Max reroll reached filters');
                    break;
                }
            } while (included || filtered);
            if(equation !== undefined && !filtered && !included){
                equations.push(equation);
            }
        }

        return equations;
    }

    public generate(ranges: [NumberRange, NumberRange], count: number): Equation[] {
        let equationList = this.generateRandom(ranges, count);
        if(equationList.length < count) {
            equationList = this.generateAll(ranges);
            equationList = shuffleArray(equationList).slice(0, count);
        }
        return equationList;
    }
}