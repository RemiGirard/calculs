import EquationWrapper from '@/Presentation/Molecules/Equation.style.tsx'
import Equation from "@/Domain/GenerateExercises/Entity/Equation.ts";
import Answer from "@/Presentation/Atoms/Answer.style.ts";
import dictionary from "@/Presentation/dictionary.ts";

type componentProps = {
  equation: Equation;
  displayAnswer: boolean;
}

export default ({equation, displayAnswer}: componentProps) => {
  const valueOrGap = (elementOfEquation: '1'|'2'|'result') => {
    let value = '';
    const element = equation[elementOfEquation];
    if(typeof element === 'undefined') return '';
    if(typeof element !== 'number') return ''; // @TODO: implement modulo result
    value = element.toString();

    if(equation.gap === elementOfEquation){
      return <Answer $displayAnswer={displayAnswer}>
        <div>{value}</div>
        <div>...</div>

      </Answer>
    }
    return value;
  }
  return (<EquationWrapper>
    <div>{valueOrGap('1')}</div>
    <div> {dictionary.calcTypeSymbol[equation.operation]} </div>
    <div>{valueOrGap('2')}</div>
    <div> = </div>
    <div>{valueOrGap('result')}</div>
  </EquationWrapper>);
};