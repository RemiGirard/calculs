import EquationConfig from '@/Domain/GenerateExercises/Entity/EquationConfig.ts';
import Equation from '@/Domain/GenerateExercises/Entity/Equation.ts';

export default class Column {
  public config: EquationConfig;
  public equationList: null|Equation[] = null;

  constructor({ config }:{config: EquationConfig}) {
    this.config = config;
  }

  getCopy(): Column {
    const newColumn = new Column({
      config: this.config.getCopy(),
    });
    newColumn.equationList = this.equationList ? this.equationList.map((equation) => equation.getCopy()) : null;
    return newColumn;
  }

  getCopyWithoutEquationList(): Column {
    return new Column({
      config: this.config.getCopy(),
    });
  }
}
