import Exercise from '@/Domain/GenerateExercises/Entity/Exercise.ts';
import { setter } from '@/utils/type/setter.ts';

export default (exerciseList: Exercise[], setExerciseList: setter<Exercise[]>, index: number) => {
  if (exerciseList.length === 1) return;
  const newExerciseList = [...exerciseList];
  newExerciseList.splice(index, 1);
  setExerciseList(newExerciseList);
};
