import Exercise from "@/Domain/Exercice.ts";

import {useRouter} from "@/Presentation/Router.tsx";
import TopBarWrapper from "@/Presentation/Organisms/TopBarWrapper.ts";
import TitleWrapper from "@/Presentation/Molecules/TitleWrapper.ts";
import TopButtonsWrapper from "@/Presentation/Molecules/TopButtonsWrapper.ts";
import GenerateExercicesWrapper from "@/Presentation/Pages/GenerateExercicesWrapper.ts";
import ExercicesTableWrapper from "@/Presentation/Organisms/ExercicesTableWrapper.ts";
import BottomButtonsWrapper from "@/Presentation/Organisms/BottomButtonsWrapper.ts";
import Gear from "@/Presentation/assets/icons/Gear.tsx";

type componentProps = {
    exercices: Exercise[],
    setExercices: (newExercices: Exercise[]) => void,
};

export default ({exercices}: componentProps) => {
    const navigate = useRouter().navigate;
    
    return (<GenerateExercicesWrapper>
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
        <ExercicesTableWrapper>
            <div>
                {exercices.map((exercice, index) => {
                    return (<div key={index}>{JSON.stringify(exercice)}</div>);
                })}
            </div>
            <aside>
                <div />
            </aside>
        </ExercicesTableWrapper>
        <BottomButtonsWrapper>
            <button onClick={() => {}}>+</button>
            <button onClick={() => {}}>play</button>
        </BottomButtonsWrapper>
    </GenerateExercicesWrapper>);
};
