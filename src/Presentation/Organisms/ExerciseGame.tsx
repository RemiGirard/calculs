import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";
import {useEffect, useRef, useState} from "react";
import getBodySize from "@/utils/getBodySize.ts";
import Equation from "@/Presentation/Molecules/Equation.tsx";
import ExerciseGameWrapper from "@/Presentation/Organisms/ExerciseGame.style.ts";

type componentProps = {
  exercise: Exercise,
  displayAnswer: boolean,
}

export default ({ exercise, displayAnswer }: componentProps) => {
  const container = useRef<HTMLDivElement>(null);
  const [bodySize, setBodySize] = useState({width: 0, height: 0});

  const exerciseLength = exercise.getLength();

  useEffect(() => {
    const updateSize = () => setBodySize(getBodySize(container.current as HTMLDivElement));
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  });

  const getFontSize = (length: {row: number, column: number}, pageSize: {width: number, height: number}) => {
    const factor = {
      width: 1/12,
      height: 1/22,
    };
    const sizeFromWidth = factor.width*(pageSize.width/length.row);
    const sizeFromHeight = factor.height*(pageSize.height)/length.column;

    return Math.max(0.1, Math.min(sizeFromWidth, sizeFromHeight));
  }

  const fontSize = getFontSize(exerciseLength, bodySize);

  return (<ExerciseGameWrapper $fontSize={fontSize} ref={container}>
      {container.current ? exercise.columnList.map((column) => {
      if(column.equationList === null) throw new Error('EquationList is null');
      return (<div key={column.uuid}>
        {column.equationList.map((equation) => <Equation key={equation.uuid} equation={equation} displayAnswer={displayAnswer} />)}
      </div>);
    }): null}
    </ExerciseGameWrapper>);
};
