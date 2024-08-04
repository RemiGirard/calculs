import { setter } from '@/utils/Type/setter.ts';
import Exercise from '@/Domain/GenerateExercises/Entity/Exercise.ts';
import ExerciseConfigWrapper from '@/Presentation/Organisms/ExerciseConfigWrapper.ts';
import InputTime from '@/Presentation/Molecules/Input/InputTime.tsx';
import InputColumnWrapper from '@/Presentation/Molecules/Input/InputColumnWrapper.ts';
import {ColumnConfigListWrapper} from '@/Presentation/Molecules/ColumnConfigWrapper.ts';
import dictionary from '@/Presentation/dictionary.ts';
import InputType from '@/Presentation/Molecules/Input/InputType.tsx';
import EquationConfig from '@/Domain/GenerateExercises/Entity/EquationConfig.ts';
import InputNumber from '@/Presentation/Molecules/Input/InputNumber.tsx';
import InputGap from '@/Presentation/Molecules/Input/InputGap.tsx';
import BottomInputTimeButtons from '@/Presentation/Molecules/BottomInputTimeButtons.tsx';
import addExerciseColumn from '@/Domain/GenerateExercises/UseCase/addExerciseColumn.ts';
import CrossExerciseConfig from '@/Presentation/Molecules/CrossExerciseConfig.tsx';
import Column from "@/Domain/GenerateExercises/Entity/Column.ts";
import deleteColumn from "@/Domain/GenerateExercises/UseCase/deleteColumn.ts";
import DivWithScrollBar from "@/utils/Component/DivWithScrollBar/DivWithScrollBar.tsx";
import colors from "@/Presentation/colors.ts";
import updateExerciseConfig from "@/Domain/GenerateExercises/UseCase/updateExerciseConfig.ts";
import updateEquationConfig from "@/Domain/GenerateExercises/UseCase/updateEquationConfig.ts";
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";
import setElementOfList from "@/utils/setElementOfList.ts";

type componentProps = {
    exercise: Exercise;
    setExercise: setter<Exercise>;
    deleteExercise: () => void;
    canBeDeleted: boolean;
}

export default function ({exercise, setExercise, deleteExercise, canBeDeleted}: componentProps) {

  const updateExerciseConfigHandler = <K extends keyof Exercise>(newValue: Exercise[K], key: K) => {
    updateExerciseConfig(exercise, setExercise, newValue, key);
  };

  const setColumnList = (newColumnList: Column[]) => {
    const newExercise = exercise.getCopy();
    newExercise.columnList = newColumnList;
    setExercise(newExercise);
  };

  const setEquationConfig = (newEquationConfig: EquationConfig, index: number) => {
    const newColumnList = [...exercise.columnList];
    newColumnList[index].config = newEquationConfig;
    setColumnList(newColumnList);
  };

  const addColumnConfigHandler = () => {
    addExerciseColumn(exercise.columnList, setColumnList, exercise.equationCountPerColumn);
  };

  const columnsCanBeDeleted = exercise.columnList.length > 1;

  return (<ExerciseConfigWrapper>
    <div>
      <div>
        <InputTime
          label={dictionary.inputLabel.exerciseDuration}
          value={exercise.questionTime}
          setValue={(newValue) => updateExerciseConfigHandler(newValue, 'questionTime')}
          unit="sec"
        />
        <InputTime
          label={dictionary.inputLabel.answerDuration}
          value={exercise.answerTime}
          setValue={(newTime) => updateExerciseConfigHandler(newTime, 'answerTime')}
          unit="sec"
        />
        <InputTime
          label={dictionary.inputLabel.equationCountPerColumn}
          value={exercise.equationCountPerColumn}
          setValue={(newTime) => updateExerciseConfigHandler(newTime, 'equationCountPerColumn')}
        />
      </div>
      <BottomInputTimeButtons deleteExercise={deleteExercise} displayDelete={canBeDeleted} />
    </div>
    <div>
      <DivWithScrollBar config={{isHorizontal: true, color: colors.secondary}}>
        <ColumnConfigListWrapper>
          {exercise.columnList.map((column, index) => {
            const setThisColumn = (newColumn: Column) => {
              setElementOfList(newColumn, exercise.columnList, setColumnList, index);
            };

            const setCorrespondingEquationList = (newEquationList: Equation[]) => {
                const newColumn = column.getCopy();
                newColumn.equationList = newEquationList;
                setThisColumn(newColumn);
              };

            const updateEquationConfigHandler = <K extends keyof EquationConfig>(newValue: EquationConfig[K], key: K) => {
              updateEquationConfig(
                column.config,
                (newConfig) => setEquationConfig(newConfig, index),
                newValue,
                key,
                exercise.equationCountPerColumn,
                column.equationList,
                setCorrespondingEquationList,
              );
            };

            const deleteColumnHandler = () => {
              deleteColumn(exercise.columnList, setColumnList, index);
            };

            return (<div key={column.uuid}>
              <div>
                <InputColumnWrapper>
                  <label>{dictionary.inputLabel.type}</label>
                  <InputType
                    value={column.config.type}
                    setValue={(v) => updateEquationConfigHandler(v, 'type')}
                  />
                </InputColumnWrapper>
                <InputColumnWrapper>
                  <label>{dictionary.inputLabel.first}</label>
                  <InputNumber value={column.config.first} setValue={(v) => updateEquationConfigHandler(v, 'first')}/>
                </InputColumnWrapper>
                <InputColumnWrapper>
                  <label>{dictionary.inputLabel.second}</label>
                  <InputNumber value={column.config.second} setValue={(v) => updateEquationConfigHandler(v, 'second')}/>
                </InputColumnWrapper>
                <InputColumnWrapper>
                  <label>{dictionary.inputLabel.gap}</label>
                  <InputGap value={column.config.possibleGaps} setValue={(v) => updateEquationConfigHandler(v, 'possibleGaps')}/>
                </InputColumnWrapper>
              </div>
              <div>{columnsCanBeDeleted ? <CrossExerciseConfig onClick={deleteColumnHandler}/> : null}</div>
            </div>);
          })}
          <div onClick={addColumnConfigHandler}>+</div>
        </ColumnConfigListWrapper>
      </DivWithScrollBar>
    </div>
    <div>
      {JSON.stringify(exercise.columnList.map((column) => column.equationList))}
    </div>
  </ExerciseConfigWrapper>);
}
