import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";
import GameWrapper from "@/Presentation/Pages/Game.style.ts";
import {useEffect, useState} from "react";
import getBodySize from "@/utils/getBodySize.ts";
import {useRouter} from "@/Presentation/Router.tsx";
import BottomAbsoluteNavigationButtons from "@/Presentation/Organisms/BottomAbsoluteNavigationButtons.style";
import TopAbsoluteNavigationButtons from "@/Presentation/Organisms/TopAbsoluteNavigationButtons.tsx";
import ArrowRight from "@/Presentation/assets/icons/ArrowRight.tsx";
import ArrowLeft from "@/Presentation/assets/icons/ArrowLeft.tsx";
import CloseCross from "@/Presentation/assets/icons/CloseCross.tsx";
import Check from "@/Presentation/assets/icons/Check.tsx";
import Equation from "@/Presentation/Molecules/Equation.tsx";

type componentProps = {
  exerciseList: Exercise[],
}

export default ({ exerciseList }: componentProps) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [bodySize, setBodySize] = useState(getBodySize());
  const [displayButtons, setDisplayButtons] = useState(false);

  const { navigate } = useRouter();

  const exercise = exerciseList[exerciseIndex];
  const exerciseLength = exercise.getLength();
  const isLastStep = exerciseIndex === exerciseList.length - 1 && displayAnswer;
  const isFirstStep = exerciseIndex === 0 && !displayAnswer;

  useEffect(() => {
    const updateSize = () => setBodySize(getBodySize());
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  });

  useEffect(() => {
    let hideButtonsTimeout: number;
    const showButtons = () => {
      setDisplayButtons(true);
      clearTimeout(hideButtonsTimeout);
      hideButtonsTimeout = window.setTimeout(() => setDisplayButtons(false), 1000);
    };
    window.addEventListener('mousemove', showButtons);

    return () => {
      window.removeEventListener('mousemove', showButtons);
      clearTimeout(hideButtonsTimeout);
    };
  });

  const setNextStep = () => {
    if(isLastStep) {
      navigate('finish');
    } else {
      if(!displayAnswer) {
        setDisplayAnswer(true);
      } else {
        setDisplayAnswer(false);
        setExerciseIndex(exerciseIndex + 1);
      }
    }
  }

  const setPreviousStep = () => {
    if(isFirstStep) {
      navigate('generateExercises');
    } else {
      if (displayAnswer) {
        setDisplayAnswer(false);
      } else {
        setDisplayAnswer(true);
        setExerciseIndex(exerciseIndex - 1);
      }
    }
  }

  const pressBackButtonHandler = () => {
    setPreviousStep();
  };

  const pressNextButtonHandler = () => {
    setNextStep();
  };

  const pressCloseButtonHandler = () => {
    navigate('generateExercises');
  };

  const getFontSize = (length: {row: number, column: number}, pageSize: {width: number, height: number}) => {
    const factor = {
      width: 1/12,
      height: 1/22,
    };
    const sizeFromWidth = factor.width*(pageSize.width/length.row);
    const sizeFromHeight = factor.height*(pageSize.height)/length.column;

    return Math.max(1, Math.min(sizeFromWidth, sizeFromHeight));
  }

  const fontSize = getFontSize(exerciseLength, bodySize);

  return (<GameWrapper $fontSize={fontSize} $displayButtons={displayButtons}>
    <div>
      {exercise.columnList.map((column) => {
      if(column.equationList === null) throw new Error('EquationList is null');
      return (<div key={column.uuid}>
        {column.equationList.map((equation) => <Equation key={equation.uuid} equation={equation} displayAnswer={displayAnswer} />)}
      </div>);
    })}
    </div>
    <TopAbsoluteNavigationButtons>
      <div />
      <button onClick={pressCloseButtonHandler}><CloseCross /></button>
    </TopAbsoluteNavigationButtons>
    <BottomAbsoluteNavigationButtons>
      <button onClick={pressBackButtonHandler}><ArrowLeft /></button>
      <button onClick={pressNextButtonHandler}>{isLastStep ? <Check /> : <ArrowRight /> }</button>
    </BottomAbsoluteNavigationButtons>
  </GameWrapper>);
};
