import EquationWrapper from '@/Presentation/Molecules/Equation.style.tsx'
import Equation, {ModuloResult} from "@/Domain/GenerateExercises/Entity/Equation.ts";
import Answer from "@/Presentation/Atoms/Answer.style.ts";
import dictionary from "@/Presentation/dictionary.ts";
import {ReactNode} from "react";

type componentProps = {
  equation: Equation;
  displayAnswer: boolean;
  letter: null|string;
}

export default ({equation, displayAnswer, letter}: componentProps) => {
  const valueOrGap = (elementOfEquation: '1'|'2'|'result', element:  number | undefined) => {
    let value: string | ReactNode = '';
    if(typeof element === 'undefined') return '';

    value = element.toString();

    if(equation.gap === elementOfEquation){
      return <Answer $displayAnswer={displayAnswer}>
        <div>...</div>
        <div>{value}</div>
      </Answer>
    }
    return value;
  }

  const moduloResult = (element: ModuloResult) => {
    return <div className='moduloResult'>
      <div>{dictionary.moduloResult.quotient} : {valueOrGap('result', element.quotient)}</div>
      <div>{dictionary.moduloResult.remainder} : {valueOrGap('result', element.remainder)}</div>
    </div>
  }

  return (<EquationWrapper>
    {letter !== null ? <div className='letter'>{letter}.</div> : null}
    <div>{valueOrGap('1', equation[1])}</div>
    <div> {dictionary.calcTypeSymbol[equation.operation]} </div>
    <div>{valueOrGap('2', equation[2])}</div>
    <div> = </div>
    <div>{equation.operation !== 'modulo'
      ? valueOrGap('result', equation.result as number)
      : moduloResult(equation.result as ModuloResult)}
    </div>
  </EquationWrapper>);
};