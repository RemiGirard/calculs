import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";

import {useRouter} from "@/Presentation/Router.tsx";
import TopBarWrapper from "@/Presentation/Organisms/TopBarWrapper.ts";
import TitleWrapper from "@/Presentation/Molecules/TitleWrapper.ts";
import TopButtonsWrapper from "@/Presentation/Molecules/TopButtonsWrapper.ts";
import GenerateExercisesWrapper from "@/Presentation/Pages/GenerateExercisesWrapper.ts";
import ExercisesTableWrapper from "@/Presentation/Organisms/ExercisesTableWrapper.ts";
import BottomButtonsWrapper from "@/Presentation/Organisms/BottomButtonsWrapper.ts";
import Gear from "@/Presentation/assets/icons/Gear.tsx";
import addExercise from "@/Domain/GenerateExercises/UseCase/addExercise.ts";
import deleteExercice from "@/Domain/GenerateExercises/UseCase/deleteExercice.ts";
import {setter} from "@/utils/Type/setter.ts";
import ExerciseConfig from "@/Presentation/Organisms/ExerciseConfig.tsx";
import updateExercise from "@/Domain/GenerateExercises/UseCase/updateExercise.ts";
import dictionary from "@/Presentation/dictionary.ts";

type componentProps = {
    exerciseList: Exercise[],
    setExerciseList: setter<Exercise[]>,
};

export default ({exerciseList, setExerciseList}: componentProps) => {
    const navigate = useRouter().navigate;

    const clickAddExerciseButton = () => addExercise(exerciseList, setExerciseList);
    const clickPlayButton = () => {
        console.log('click play');
    };

    const clickGearButton = () => navigate('config');

    const canDeleteExercise = exerciseList.length > 1;

    return (<GenerateExercisesWrapper>
        <TopBarWrapper>
            <TitleWrapper>
                <h1>{dictionary.title}</h1>
            </TitleWrapper>
            <TopButtonsWrapper>
                <button onClick={clickGearButton}>
                    <Gear />
                </button>
            </TopButtonsWrapper>
        </TopBarWrapper>
        <ExercisesTableWrapper>
            <div>
                {exerciseList.map((exercise, index) => {
                    const deleteThisExercise = () => {
                        deleteExercice(exerciseList, setExerciseList, index);
                    }

                    const setExercise:setter<Exercise> = (newExercise: Exercise) => {
                        updateExercise(exerciseList, setExerciseList, index, newExercise);
                    }
                    return (<ExerciseConfig
                      key={index}
                      exercise={exercise}
                      setExercise={setExercise}
                      deleteExercise={deleteThisExercise}
                      canBeDeleted={canDeleteExercise}
                    />);
                })}
            </div>
            <aside>
                <div />
            </aside>
        </ExercisesTableWrapper>
        <BottomButtonsWrapper>
            <button onClick={clickAddExerciseButton}>+</button>
            <button onClick={clickPlayButton}>play</button>
        </BottomButtonsWrapper>
    </GenerateExercisesWrapper>);
};
