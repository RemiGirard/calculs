import Exercise from "@/Domain/Exercise.ts";

import {useRouter} from "@/Presentation/Router.tsx";
import TopBarWrapper from "@/Presentation/Organisms/TopBarWrapper.ts";
import TitleWrapper from "@/Presentation/Molecules/TitleWrapper.ts";
import TopButtonsWrapper from "@/Presentation/Molecules/TopButtonsWrapper.ts";
import GenerateExercisesWrapper from "@/Presentation/Pages/GenerateExercisesWrapper.ts";
import ExercisesTableWrapper from "@/Presentation/Organisms/ExercisesTableWrapper.ts";
import BottomButtonsWrapper from "@/Presentation/Organisms/BottomButtonsWrapper.ts";
import Gear from "@/Presentation/assets/icons/Gear.tsx";

type componentProps = {
    exerciseList: Exercise[],
    setExerciseList: (newExerciseList: Exercise[]) => void,
};

export default ({exerciseList}: componentProps) => {
    const navigate = useRouter().navigate;

    return (<GenerateExercisesWrapper>
        <TopBarWrapper>
            <TitleWrapper>
                <h1>S.M.U.C</h1>
            </TitleWrapper>
            <TopButtonsWrapper>
                <button onClick={() => navigate('config')}>
                    <Gear />
                </button>
            </TopButtonsWrapper>
        </TopBarWrapper>
        <ExercisesTableWrapper>
            <div>
                {exerciseList.map((exercise, index) => {
                    return (<div key={index}>{JSON.stringify(exercise)}</div>);
                })}
            </div>
            <aside>
                <div />
            </aside>
        </ExercisesTableWrapper>
        <BottomButtonsWrapper>
            <button onClick={() => {}}>+</button>
            <button onClick={() => {}}>play</button>
        </BottomButtonsWrapper>
    </GenerateExercisesWrapper>);
};
