import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";
import {setter} from "@/utils/Type/setter.ts";
import generateEquationListOfColumnList from "@/Domain/GenerateExercises/UseCase/generateEquationListOfColumnList.ts";
import Column from "@/Domain/GenerateExercises/Entity/Column.ts";

export default <K extends keyof Exercise>(exercise: Exercise, setExercise: setter<Exercise>, newValue: Exercise[K], key: K) => {
  const newExercise = exercise.getCopy();
  newExercise[key] = newValue;
  if(key === 'equationCountPerColumn'){
    const setColumnList = (newColumnList: Column[]) => newExercise.columnList = newColumnList;
    generateEquationListOfColumnList(newExercise.columnList, setColumnList, newExercise.equationCountPerColumn);
  }
  setExercise(newExercise);
};