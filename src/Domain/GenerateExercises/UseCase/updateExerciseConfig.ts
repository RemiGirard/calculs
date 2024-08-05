import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";
import {setter} from "@/utils/type/setter.ts";
import generateEquationListOfColumnList from "@/Domain/GenerateExercises/UseCase/generateEquationListOfColumnList.ts";
import Column from "@/Domain/GenerateExercises/Entity/Column.ts";

export default <K extends keyof Exercise>(exercise: Exercise, setExercise: setter<Exercise>, newValue: Exercise[K], key: K) => {
  exercise[key] = newValue;
  if(key === 'equationCountPerColumn'){
    const setColumnList = (newColumnList: Column[]) => exercise.columnList = newColumnList;
    generateEquationListOfColumnList(exercise.columnList, setColumnList, exercise.equationCountPerColumn);
  }
  setExercise(exercise);
};