import Column from '@/Domain/GenerateExercises/Entity/Column.ts';
import { setter } from '@/utils/Type/setter.ts';
import {generateEquationList} from "@/Domain/GenerateExercises/Generator/useGenerator.tsx";

export default (columnList: Column[], setColumnList: setter<Column[]>, equationCount: number) => {
  const newColumn = columnList[columnList.length - 1].getCopyWithoutEquationList();
  newColumn.equationList = generateEquationList(newColumn.config, equationCount);
  const newColumnList = [...columnList, newColumn];
  setColumnList(newColumnList);
};
