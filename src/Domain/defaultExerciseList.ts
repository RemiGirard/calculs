import Exercise from "@/Domain/Exercise.ts";
import isDevEnv from "@/Domain/isDevEnv.ts";
import Column from "@/Domain/Column.ts";
import EquationConfig from "@/Domain/EquationConfig.ts";

const defaultConfig = new EquationConfig({
    type: 'addition',
    first: {type: 'range', min: 0, max: 10},
    second: {type: 'range', min: 0, max: 10},
    possibleGaps: {
        first: false,
        second: false,
        result: true,
    },
});

const defaultColumn = new Column({
    config: defaultConfig,
});

const defaultExercise = new Exercise({
    questionTime: isDevEnv ? 5 : 10,
    answerTime: isDevEnv ? 5 : 10,
    columnList: [defaultColumn],
});

export default [defaultExercise];