import EquationConfig from "@/Domain/EquationConfig.ts";
import Equation from "@/Domain/Equation.ts";

export default class Column {
    public config: EquationConfig;
    public equations: null|Equation[] = null;

    constructor({config}:{config: EquationConfig}) {
        this.config = config;
    }
}