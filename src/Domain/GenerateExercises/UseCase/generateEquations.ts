import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";
import type {setter} from "@/utils/Type/setter.ts";
import {generateColumn} from "@/Domain/GenerateExercises/Generator/useGenerator.tsx";

export default (exerciceList: Exercise[], setExerciceList: setter<Exercise[]>) => {
  setExerciceList(exerciceList.map((exercise) => {
    exercise.columnList = exercise.columnList.map((column) => {
      if (column.equationList === null) {
        column.equationList = generateColumn(column.config, exercise.equationCountPerColumn);
      }
      return column;
    });
    return exercise;
  }));
};