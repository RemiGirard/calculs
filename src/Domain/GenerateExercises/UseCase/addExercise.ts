import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";
import {setter} from "@/utils/Type/setter.ts";

export default (exerciseList: Exercise[], setExerciseList: setter<Exercise[]>) => {
    const newExercise = exerciseList[exerciseList.length - 1].getCopy();
    const newExerciseList = [...exerciseList, newExercise];
    setExerciseList(newExerciseList);
};