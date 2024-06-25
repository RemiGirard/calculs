import Exercise from "@/Domain/Exercise.ts";
import {setState} from "@/utils/react.ts";

export default (exerciseList: Exercise[], setExerciseList: setState<Exercise[]>, index: number) => {
    const newExerciseList = [...exerciseList];
    newExerciseList.splice(index, 1);
    setExerciseList(newExerciseList);
}