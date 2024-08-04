import Exercise from '@/Domain/GenerateExercises/Entity/Exercise.ts';
import addExercise from '@/Domain/GenerateExercises/UseCase/addExercise.ts';
import deleteExercise from '@/Domain/GenerateExercises/UseCase/deleteExercise.ts';

import TopBarWrapper from '@/Presentation/Organisms/TopBarWrapper.ts';
import { useRouter } from '@/Presentation/Router.tsx';
import TitleWrapper from '@/Presentation/Molecules/TitleWrapper.ts';
import TopButtonsWrapper from '@/Presentation/Molecules/TopButtonsWrapper.ts';
import GenerateExercisesWrapper from '@/Presentation/Pages/GenerateExercisesWrapper.ts';
import ExercisesTableWrapper from '@/Presentation/Organisms/ExercisesTableWrapper.ts';
import BottomButtonsWrapper from '@/Presentation/Organisms/BottomButtonsWrapper.ts';
import Gear from '@/Presentation/assets/icons/Gear.tsx';
import ExerciseConfig from '@/Presentation/Organisms/ExerciseConfig.tsx';
import dictionary from '@/Presentation/dictionary.ts';
import colors from "@/Presentation/colors.ts";
import { setter } from '@/utils/Type/setter.ts';
import DivWithScrollBar from "@/utils/Component/DivWithScrollBar/DivWithScrollBar.tsx";
import setElementOfList from "@/utils/setElementOfList.ts";

type componentProps = {
  exerciseList: Exercise[],
  setExerciseList: setter<Exercise[]>,
};

export default ({ exerciseList, setExerciseList }: componentProps) => {
  const { navigate } = useRouter();


  const clickAddExerciseHandler = () => addExercise(exerciseList, setExerciseList);
  const clickPlayHandler = () => console.log('click play');
  const clickGearHandler = () => navigate('config');

  const canDeleteExercise = exerciseList.length > 1;

  return (<GenerateExercisesWrapper>
    <TopBarWrapper>
      <TitleWrapper>
        <h1>{dictionary.title}</h1>
      </TitleWrapper>
      <TopButtonsWrapper>
        <button onClick={clickGearHandler} type="button" aria-label="Config">
          <Gear />
        </button>
      </TopButtonsWrapper>
    </TopBarWrapper>
    <DivWithScrollBar config={{color: colors.secondary}}>
      <ExercisesTableWrapper>

        {exerciseList.map((exercise, index) => {
          const deleteThisExercise = () => deleteExercise(exerciseList, setExerciseList, index);

          const setThisExercise: setter<Exercise> = (newExercise) => {
            setElementOfList(newExercise, exerciseList, setExerciseList, index);
          };

          return (<ExerciseConfig
              key={exercise.uuid}
              exercise={exercise}
              setExercise={setThisExercise}
              deleteExercise={deleteThisExercise}
              canBeDeleted={canDeleteExercise}
          />);
        })}
      </ExercisesTableWrapper>
    </DivWithScrollBar>
    <BottomButtonsWrapper>
      <button onClick={clickAddExerciseHandler} aria-label="add exercise" type="button">+</button>
      <button onClick={clickPlayHandler} aria-label="play" type="button">play</button>
    </BottomButtonsWrapper>
  </GenerateExercisesWrapper>);
};
