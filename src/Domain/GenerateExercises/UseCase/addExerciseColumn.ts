import Column from '@/Domain/GenerateExercises/Entity/Column.ts';
import { setter } from '@/utils/Type/setter.ts';

export default (columnList: Column[], setColumnList: setter<Column[]>) => {
  const newColumn = columnList[columnList.length - 1].getCopyWithoutEquationList();
  const newColumnList = [...columnList, newColumn];
  setColumnList(newColumnList);
};
