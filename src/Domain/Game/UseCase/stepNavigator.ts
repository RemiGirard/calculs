import {PageName} from "@/Domain/page.ts";
import {setter} from "@/utils/type/setter.ts";
import {navigate} from "@/Presentation/createRouterInterface.ts";

type useCaseProps = {
  navigate: navigate<PageName>,
  isFirstExercise: boolean,
  isLastExercise: boolean,
  isAnswerStep: boolean,
  setAnswerStep: setter<boolean>,
  setPreviousExercise: setter<void>,
  setNextExercise: setter<void>,
}

export default ({navigate, isFirstExercise, isLastExercise, isAnswerStep, setAnswerStep, setPreviousExercise, setNextExercise}: useCaseProps) => {
  const isFirstStep = isFirstExercise && !isAnswerStep;

  const setPreviousStep = () => {
    if(isFirstStep) {
      navigate('generateExercises');
    } else {
      if (isAnswerStep) {
        setAnswerStep(false);
      } else {
        setAnswerStep(true);
        setPreviousExercise();
      }
    }
  };

  const isLastStep = isLastExercise && isAnswerStep;

  const setNextStep = () => {
    if (isLastStep) {
      navigate('finish');
    } else {
      if (!isAnswerStep) {
        setAnswerStep(true);
      } else {
        setAnswerStep(false);
        setNextExercise();
      }
    }
  };

  return {setPreviousStep, setNextStep};
}