import Exercise from '@/Domain/GenerateExercises/Entity/Exercise.ts';
import { setter } from '@/utils/type/setter.ts';

import {generateEquationList} from "@/Domain/GenerateExercises/Generator/useGenerator.tsx";

export default (exerciseList: Exercise[], setExerciseList: setter<Exercise[]>) => {
  const newExercise = exerciseList[exerciseList.length - 1].getCopyWithoutEquationList();
  newExercise.columnList.map((column) => {
    column.equationList = generateEquationList(column.config, newExercise.equationCountPerColumn);
    return column;
  });
  const newExerciseList = [...exerciseList, newExercise];
  setExerciseList(newExerciseList);
};
