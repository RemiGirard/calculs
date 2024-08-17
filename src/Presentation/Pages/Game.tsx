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

type componentProps = {
  exerciseList: Exercise[],
}

export default ({ exerciseList }: componentProps) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [bodySize, setBodySize] = useState(getBodySize());
  const [displayButtons, setDisplayButtons] = useState(false);

  const { navigate } = useRouter();

  const exercise = exerciseList[exerciseIndex];
  const length = exercise.getLength();
  const isLastExercise = exerciseIndex === exerciseList.length - 1;
  const isFirstExercise = exerciseIndex === 0;

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

  const pressBackButtonHandler = () => {
    if(isFirstExercise) {
      navigate('generateExercises')
    } else {
      setExerciseIndex(exerciseIndex - 1);
    }
  };

  const pressCloseButtonHandler = () => {
    navigate('generateExercises');
  }

  const pressNextButtonHandler = () => {
    if(isLastExercise) {
      navigate('finish');
    } else {
      setExerciseIndex(exerciseIndex + 1);
    }
  };

  const getFontSize = (length: {row: number, column: number}, pageSize: {width: number, height: number}) => {
    const factor = {
      width: 1/15,
      height: 1/22,
    };
    const sizeFromWidth = factor.width*(pageSize.width/length.row);
    const sizeFromHeight = factor.height*(pageSize.height)/length.column;

    return Math.max(1, Math.min(sizeFromWidth, sizeFromHeight));
  }

  const fontSize = getFontSize(length, bodySize);

  return (<GameWrapper $fontSize={fontSize} $displayButtons={displayButtons}>
    <div>
      {exercise.columnList.map((column) => {
      if(column.equationList === null) throw new Error('EquationList is null');
      return (<div key={column.uuid}>
        {column.equationList.map((equation) => <div key={equation.uuid}>{equation.render()}</div>)}
      </div>);
    })}
    </div>
    <TopAbsoluteNavigationButtons>
      <div />
      <button onClick={pressCloseButtonHandler}><CloseCross /></button>
    </TopAbsoluteNavigationButtons>
    <BottomAbsoluteNavigationButtons>
      <button onClick={pressBackButtonHandler}><ArrowLeft /></button>
      <button onClick={pressNextButtonHandler}>{isLastExercise ? <Check /> : <ArrowRight /> }</button>
    </BottomAbsoluteNavigationButtons>
  </GameWrapper>);
}