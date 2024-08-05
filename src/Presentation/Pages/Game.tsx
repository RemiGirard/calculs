import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";
import GameWrapper from "@/Presentation/Pages/Game.style.ts";
import {useEffect, useState} from "react";
import getBodySize from "@/utils/getBodySize.ts";
import {useRouter} from "@/Presentation/Router.tsx";
import BottomAbsoluteNavigationButtons from "@/Presentation/Organisms/BottomAbsoluteNavigationButtons.tsx";
import TopAbsoluteNavigationButtons from "@/Presentation/Organisms/TopAbsoluteNavigationButtons.tsx";

type componentProps = {
  exerciseList: Exercise[],
}

export default ({ exerciseList }: componentProps) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [bodySize, setBodySize] = useState(getBodySize());

  const { navigate } = useRouter();

  useEffect(() => {
    const updateSize = () => setBodySize(getBodySize());
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  });

  const pressBackButtonHandler = () => {
    navigate('generateExercises');
  };

  const pressNextButtonHandler = () => {
    console.log('pressNextButtonHandler');
  };

  const exercise = exerciseList[exerciseIndex];
  const length = exercise.getLength();

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

  return (<GameWrapper $fontSize={fontSize}>
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
      <button onClick={pressBackButtonHandler}>Close</button>
    </TopAbsoluteNavigationButtons>
    <BottomAbsoluteNavigationButtons>
      <button onClick={pressBackButtonHandler}>Back</button>
      <button onClick={pressNextButtonHandler}>Next</button>
    </BottomAbsoluteNavigationButtons>
  </GameWrapper>);
}