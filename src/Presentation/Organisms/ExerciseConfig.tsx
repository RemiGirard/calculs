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
import CrossExerciceConfig from '@/Presentation/Molecules/CrossExerciseConfig.tsx';
import Column from "@/Domain/GenerateExercises/Entity/Column.ts";
import deleteColumn from "@/Domain/GenerateExercises/UseCase/deleteColumn.ts";
import DivWithScrollBar from "@/utils/Component/DivWithScrollBar/DivWithScrollBar.tsx";
import colors from "@/Presentation/colors.ts";

type componentProps = {
    exercise: Exercise;
    setExercise: setter<Exercise>;
    deleteExercise: () => void;
    canBeDeleted: boolean;
}

export default function ({exercise, setExercise, deleteExercise, canBeDeleted}: componentProps) {
  const updateTimeInput = <K extends keyof Exercise>(newTime: Exercise[K], key: K) => {
    const newExercise = exercise.getCopy();
    newExercise[key] = newTime;
    setExercise(newExercise);
  };

  const updateEquationConfig = (newEquationConfig: EquationConfig, index: number) => {
    const newExercise = exercise.getCopy();
    newExercise.columnList[index].config = newEquationConfig;
    newExercise.columnList[index].equationList = null;
    setExercise(newExercise);
  };

  const addColumnConfigHandler = () => {
    addExerciseColumn(exercise.columnList, (newColumnList) => {
      exercise.columnList = newColumnList;
      setExercise(exercise);
    });
  };

  const setColumns = (newColumns: Column[]) => {
    const newExercise = exercise.getCopy();
    newExercise.columnList = newColumns;
    setExercise(newExercise);
  }

  return (<ExerciseConfigWrapper>
      <div>
        <div>
          <InputTime
            label={dictionary.inputLabel.exerciseDuration}
            value={exercise.questionTime}
            setValue={(newTime) => updateTimeInput(newTime, 'questionTime')}
            unit="sec"
          />
          <InputTime
            label={dictionary.inputLabel.answerDuration}
            value={exercise.answerTime}
            setValue={(newTime) => updateTimeInput(newTime, 'answerTime')}
            unit="sec"
          />
          <InputTime
            label={dictionary.inputLabel.equationCountPerColumn}
            value={exercise.equationCountPerColumn}
            setValue={(newTime) => updateTimeInput(newTime, 'equationCountPerColumn')}
          />
        </div>
        <BottomInputTimeButtons deleteExercise={deleteExercise} displayDelete={canBeDeleted} />
      </div>
      <div>
        <DivWithScrollBar config={{isHorizontal: true, color: colors.secondary}}>
          <ColumnConfigListWrapper>
            {exercise.columnList.map((column, index) => {
              const updateConfig = <K extends keyof EquationConfig>(newValue: EquationConfig[K], key: K) => {
                const newConfig = column.config.getCopy();
                newConfig[key] = newValue;
                updateEquationConfig(newConfig, index);
              };

              const deleteColumnHandler = () => {
                deleteColumn(exercise.columnList, setColumns, index);
              };

              return (<div key={index}>
                <div>{exercise.columnList.length > 1 ? <CrossExerciceConfig onClick={deleteColumnHandler}/> : null}</div>
                <div>
                  <InputColumnWrapper>
                    <label>{dictionary.inputLabel.type}</label>
                    <InputType
                      value={column.config.type}
                      setValue={(v) => updateConfig(v, 'type')}
                    />
                  </InputColumnWrapper>
                  <InputColumnWrapper>
                    <label>{dictionary.inputLabel.first}</label>
                    <InputNumber value={column.config.first} setValue={(v) => updateConfig(v, 'first')} />
                  </InputColumnWrapper>
                  <InputColumnWrapper>
                    <label>{dictionary.inputLabel.second}</label>
                    <InputNumber value={column.config.second} setValue={(v) => updateConfig(v, 'second')} />
                  </InputColumnWrapper>
                  <InputColumnWrapper>
                    <label>{dictionary.inputLabel.gap}</label>
                    <InputGap value={column.config.possibleGaps} setValue={(v) => updateConfig(v, 'possibleGaps')} />
                  </InputColumnWrapper>
                </div>
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
