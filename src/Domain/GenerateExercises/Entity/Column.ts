import EquationConfig from '@/Domain/GenerateExercises/Entity/EquationConfig.ts';
import Equation from '@/Domain/GenerateExercises/Entity/Equation.ts';

export default class Column {
  public config: EquationConfig;
  public equationList: null|Equation[] = null;
  uuid: string;

  constructor({ config }:{config: EquationConfig}) {
    this.config = config;
    this.uuid = crypto.randomUUID();
  }

  getCopyWithoutEquationList(): Column {
    return new Column({
      config: this.config.getCopy(),
    });
  }
}
