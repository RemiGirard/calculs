import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";
import GameWrapper from "@/Presentation/Pages/Game.style.ts";
import {useState} from "react";
import {useRouter} from "@/Presentation/Router.tsx";
import BottomAbsoluteNavigationButtons from "@/Presentation/Organisms/BottomAbsoluteNavigationButtons.style";
import TopAbsoluteNavigationButtons from "@/Presentation/Organisms/TopAbsoluteNavigationButtons.tsx";
import ArrowRight from "@/Presentation/assets/icons/ArrowRight.tsx";
import ArrowLeft from "@/Presentation/assets/icons/ArrowLeft.tsx";
import CloseCross from "@/Presentation/assets/icons/CloseCross.tsx";
import Check from "@/Presentation/assets/icons/Check.tsx";
import ExerciseGame from "@/Presentation/Organisms/ExerciseGame.tsx";
import useDisplayOnMouseMove from "@/utils/hook/useDisplayOnMouseMove.ts";
import stepNavigator from "@/Domain/Game/UseCase/stepNavigator.ts";
import quitGame from "@/Domain/Game/UseCase/quitGame.ts";
import useTimeBar from "@/Presentation/hooks/useTimeBar.tsx";

type componentProps = {
  exerciseList: Exercise[],
}

export default ({ exerciseList }: componentProps) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const {display: displayButtons} = useDisplayOnMouseMove({});
  const { navigate } = useRouter();

  const currentExercise = exerciseList[exerciseIndex];

  const {setPreviousStep, setNextStep} = stepNavigator({
   navigate: navigate,
   isFirstExercise: exerciseIndex === 0,
   isLastExercise: exerciseIndex === exerciseList.length - 1,
   isAnswerStep: displayAnswer,
   setAnswerStep: setDisplayAnswer,
   setPreviousExercise: () => setExerciseIndex(exerciseIndex - 1),
   setNextExercise: () => setExerciseIndex(exerciseIndex + 1),
  });

  const {TimeBar, restart} = useTimeBar({
    duration: 5000,
    callback: setNextStep,
    reverse: true,
    reverseDuration: 5000,
    reverseCallBack: () => {
      setNextStep();
      restart();
    },
    color: 'red',
  });

  const pressBackButtonHandler = () => setPreviousStep();
  const pressNextButtonHandler = () => setNextStep();
  const pressCloseButtonHandler = () => quitGame(navigate);
  const displayNextOrFinish = exerciseIndex === exerciseList.length - 1 && displayAnswer;

  return (<GameWrapper $displayButtons={displayButtons}>
    <ExerciseGame exercise={currentExercise} displayAnswer={displayAnswer} />
    <div>
      <TimeBar/>
    </div>
    <TopAbsoluteNavigationButtons>
      <div />
      <button onClick={pressCloseButtonHandler}><CloseCross /></button>
    </TopAbsoluteNavigationButtons>
    <BottomAbsoluteNavigationButtons>
      <button onClick={pressBackButtonHandler}><ArrowLeft /></button>
      <button onClick={pressNextButtonHandler}>{displayNextOrFinish ? <ArrowRight /> : <Check /> }</button>
    </BottomAbsoluteNavigationButtons>
  </GameWrapper>);
};
