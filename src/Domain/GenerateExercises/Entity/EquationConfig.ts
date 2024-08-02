import { CalcType } from '@/Domain/GenerateExercises/Entity/CalcTypeList.ts';
import { NumberRange } from '@/Domain/GenerateExercises/Entity/NumberRange.ts';

export default class EquationConfig {
  public type: CalcType;

  public first: NumberRange;

  public second: NumberRange;

  public possibleGaps: {
        first: boolean,
        second: boolean,
        result: boolean,
    };

  constructor({
    type, first, second, possibleGaps,
  }:{
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

  getCopy(): EquationConfig {
    return new EquationConfig({
      type: this.type,
      first: this.first,
      second: this.second,
      possibleGaps: { ...this.possibleGaps },
    });
  }

  getPossibleGaps(): ('first' | 'second' | 'result')[] {
    const entries = Object.entries(this.possibleGaps) as ['first' | 'second' | 'result', boolean][];
    const filteredEntries = entries.filter((entry) => entry[1]);

    return filteredEntries.map(([key]) => key);
  }
}
