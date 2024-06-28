import Exercise from '@/Domain/GenerateExercises/Entity/Exercise.ts';
import { setter } from '@/utils/Type/setter.ts';

export default (
  exerciseList: Exercise[],
  setExerciseList: setter<Exercise[]>,
  index: number,
  newExercise: Exercise,
) => {
  const newExerciseList = [...exerciseList];
  newExerciseList[index] = newExercise;
  setExerciseList(newExerciseList);
};
