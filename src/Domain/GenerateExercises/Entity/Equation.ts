import { CalcType } from '@/Domain/GenerateExercises/Entity/CalcTypes.ts';
import { getRandomItemOfArray } from '@/utils/utils.ts';
import MathFunctions from '@/Domain/GenerateExercises/Entity/MathFunctions.ts';

export type ModuloResult = {quotient: number, remainder:number};

export type ElementId = '1'|'2'|'result';

export default class Equation {
  1: number;
  operation: CalcType;
  2: number;
  result?: number|ModuloResult;
  gap?: ElementId;

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
  }

  calculateResult() {
    if (this.operation && this[1] && this[2]) {
      this.result = MathFunctions[this.operation](this[1], this[2]);
    }
  }

  applyRandomGap(possibleGaps: ElementId[]) {
    this.gap = possibleGaps.length > 0 ? getRandomItemOfArray(possibleGaps) : 'result';
  }

  getOperands(): [number, number] {
    return [this[1], this[2]];
  }

  getCopy(): Equation {
    return new Equation({
      first: this[1],
      second: this[2],
      operation: this.operation,
      calculateResult: false,
      gap: this.gap,
    });
  }
}
