import Exercise from '@/Domain/GenerateExercises/Entity/Exercise.ts';
import isDevEnv from '@/Domain/GenerateExercises/UseCase/isDevEnv.ts';
import Column from '@/Domain/GenerateExercises/Entity/Column.ts';
import EquationConfig from '@/Domain/GenerateExercises/Entity/EquationConfig.ts';
import generateEquationListOfExerciseList
  from "@/Domain/GenerateExercises/UseCase/generateEquationListOfExerciseList.ts";

const defaultConfig = new EquationConfig({
  type: 'addition',
  first: { type: 'range', min: 1, max: 9 },
  second: { type: 'range', min: 1, max: 9 },
  possibleGaps: {
    first: false,
    second: false,
    result: true,
  },
});

export const defaultNumberGeneration = {
  fix: 1,
  range: [1, 9],
  rangeTens: [1, 50],
};

const defaultColumn = new Column({
  config: defaultConfig,
});


const defaultExercise = new Exercise({
  questionTime: isDevEnv ? 5 : 180,
  answerTime: isDevEnv ? 5 : 60,
  equationNumberPerColumn: 6,
  columnList: [defaultColumn],
});

let defaultExerciseList = [defaultExercise];
generateEquationListOfExerciseList(defaultExerciseList, (newExerciseList)=>defaultExerciseList=newExerciseList);

export default defaultExerciseList;
