import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";

export default (exerciseList: Exercise[], setExerciseList: (exerciseList: Exercise[]) => void) => {
    const newExercise = exerciseList[exerciseList.length - 1].getCopy();
    const newExerciseList = [...exerciseList, newExercise];
    setExerciseList(newExerciseList);
};