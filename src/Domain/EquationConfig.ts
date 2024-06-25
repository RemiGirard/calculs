import {CalcType} from "@/Domain/CalcTypes.ts";
import {NumberRange} from "@/Domain/NumberRange.ts";

export default class EquationConfig {
    public type: CalcType;
    public first: NumberRange;
    public second: NumberRange;
    public possibleGaps: {
        first: boolean,
        second: boolean,
        result: boolean,
    };

    constructor({type, first, second, possibleGaps}:{
        type: EquationConfig['type'],
        first: EquationConfig['first'],
        second: EquationConfig['second'],
        possibleGaps: EquationConfig['possibleGaps'],
    }) {
        this.type = type;
        this.first = first;
        this.second = second;
        this.possibleGaps = possibleGaps;
    }
};
