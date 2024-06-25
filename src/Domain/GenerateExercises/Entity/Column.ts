import EquationConfig from "@/Domain/GenerateExercises/Entity/EquationConfig.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";

export default class Column {
    public config: EquationConfig;
    public equations: null|Equation[] = null;

    constructor({config}:{config: EquationConfig}) {
        this.config = config;
    }

    getCopy(): Column {
        return new Column({
            config: this.config.getCopy(),
        });
    }
}