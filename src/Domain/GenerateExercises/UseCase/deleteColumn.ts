import {setter} from "@/utils/Type/setter.ts";
import Column from "@/Domain/GenerateExercises/Entity/Column.ts";

export default (columnList: Column[], setColumnList: setter<Column[]>, index: number) => {
  const newColumnList = [...columnList];
  newColumnList.splice(index, 1);
  setColumnList(newColumnList);
}