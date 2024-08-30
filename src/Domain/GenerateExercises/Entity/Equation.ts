import { CalcType } from '@/Domain/GenerateExercises/Entity/CalcTypeList.ts';
import getRandomItemOfArray from "@/utils/array/getRandomItemOfArray.ts";
import MathFunctions from '@/Domain/GenerateExercises/Entity/MathFunctions.ts';
import dictionary from "@/Presentation/dictionary.ts";

export type ModuloResult = {quotient: number, remainder:number};

export type ElementId = '1'|'2'|'result';

export default class Equation {
  1: number;
  operation: CalcType;
  2: number;
  result?: number|ModuloResult;
  gap?: ElementId;
  uuid: string = crypto.randomUUID();

  constructor({
    first, second, operation, possibleGaps, calculateResult = true, gap,
  }:{
        first: number,
        second: number,
        operation: CalcType,
        possibleGaps?: ElementId[],
        calculateResult?: boolean,
        gap?: ElementId,
    }) {
    this[1] = first;
    this[2] = second;
    this.operation = operation;
    if (possibleGaps) this.applyRandomGap(possibleGaps);
    if (calculateResult) this.calculateResult();
    if (gap) this.gap = gap;
    this.uuid = crypto.randomUUID();
  }

  calculateResult() {
      this.result = MathFunctions[this.operation](this[1], this[2]);
  }

  applyRandomGap(possibleGaps: ElementId[]) {
    this.gap = possibleGaps.length > 0 ? getRandomItemOfArray(possibleGaps) : 'result';
  }

  getCharacterLength() {
    if(this.result === undefined) return 1;
    return this[1].toString().length + 2 + this[2].toString().length + 2 + (this.operation === 'modulo' && typeof this.result === 'object' ? (4+this.result?.remainder.toString().length) : this.result.toString().length );
  }

  render() {
    return `${this[1]} ${dictionary.calcTypeSymbol[this.operation]} ${this[2]} = ${this.result}`;
  }
}
