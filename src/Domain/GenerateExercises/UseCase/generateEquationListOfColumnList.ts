import type {setter} from "@/utils/Type/setter.ts";
import {generateEquationList} from "@/Domain/GenerateExercises/Generator/useGenerator.tsx";
import Column from "@/Domain/GenerateExercises/Entity/Column.ts";

export default (columnList: Column[], setColumnList: setter<Column[]>, count: number) => {
  setColumnList(columnList.map((column) => {
    column.equationList = generateEquationList(column.config, count)
    return column;
  }));
};