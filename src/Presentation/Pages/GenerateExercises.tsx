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
import {setState} from "@/utils/react.ts";

type componentProps = {
    exerciseList: Exercise[],
    setExerciseList: setState<Exercise[]>,
};

export default ({exerciseList, setExerciseList}: componentProps) => {
    const navigate = useRouter().navigate;

    const clickAddExerciseButton = () => addExercise(exerciseList, setExerciseList);
    const clickPlayButton = () => {
        console.log('click play');
    };

    const clickGearButton = () => navigate('config');

    return (<GenerateExercisesWrapper>
        <TopBarWrapper>
            <TitleWrapper>
                <h1>S.M.U.C</h1>
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
                    // @ts-ignore not used yet
                    const deleteThisExercise = () => {
                        deleteExercice(exerciseList, setExerciseList, index);
                    }
                    return (<div key={index}>{JSON.stringify(exercise)}</div>);
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
