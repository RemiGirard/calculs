import { useEffect } from 'react';

import EquationIdentifier from './EquationIdentifier';
import { DisplayElementAnswer, ElementId } from '../../routes/Exercice.type';
import { EquationInterface } from '../../routes/Exercice.type';
import { EquationElementWrapper, EquationWrapper } from './Equation.style';
import { integerToLetter } from '../../utils/number';
import dictionaryTyped from '../../dictionary.json'
const dictionary:any = dictionaryTyped;

const Equation = ({
  equation,
  showAnswer,
  updateParentTextSize,
  columnSizes,
  dynamicFontSize,
  displayLetterId = false,
  equationIndexExercice = 0,
}: {
  equation: EquationInterface,
  showAnswer: boolean,
  updateParentTextSize: any,
  columnSizes: {1: number, 2: number, result: number},
  dynamicFontSize: number,
  displayLetterId?: boolean,
  equationIndexExercice?: number,
}) => {

  const getTextSize = (equation: EquationInterface, displayLetterId: boolean) => {
    let textSize = 0;
    const incTextSize = (number = 1) => textSize += number;

    if(displayLetterId){incTextSize();}
    incTextSize(equation[1].toString().length)
    incTextSize(2); // operation character
    incTextSize(equation[2].toString().length)
    incTextSize(2); // equal sign
    if(equation.operation === 'modulo') {
      incTextSize(3)
    } else {
      incTextSize(equation['result'].toString().length)
    }
    return textSize
  };

  useEffect(() => {
    updateParentTextSize(getTextSize(equation, displayLetterId))
  }, [displayLetterId, equation])

  const getModuloResultDisplay = (quotient:number, remainder:number) => {
    return (<div style={{display: 'flex', flexDirection: 'column', fontSize: '0.5em'}}>
        <div>quotient: {quotient}</div>
        <div>reste: {remainder}</div>
    </div>);
  };

  const EquationElement = (
    {element, display, width}
    : {element: any, display: DisplayElementAnswer, width: number}
    ) => {
    return (<EquationElementWrapper $display={display} $width={width}>
      <div>{typeof element === 'number'
        ? element
        : getModuloResultDisplay(element[0], element[1])}
      </div>
      {display === 'hideAnswer'
        ? <div>..</div>
        : null}
    </EquationElementWrapper>)
  }

  const getDisplay = (
    {elementId, gap, showAnswer}
    : {elementId : ElementId, gap: ElementId, showAnswer: boolean}
  ) => {
    let display: DisplayElementAnswer = 'show';
    if(gap === elementId){
      display = showAnswer ? 'showAnswer': 'hideAnswer';
    }
    return display;
  }
  
  return (<EquationWrapper $dynamicFontSize={dynamicFontSize}>
    <div> 
      {displayLetterId
        ? <EquationIdentifier identifier={integerToLetter(equationIndexExercice)}/>
        : null
      }
      <EquationElement
        element={equation[1]}
        display={getDisplay({elementId: '1', gap: equation.gap, showAnswer})}
        width={columnSizes['1']}
      />
      {dictionary.calcCharacter[equation.operation] ?? equation.operation}
      <EquationElement
        element={equation[2]}
        display={getDisplay({elementId: '2', gap: equation.gap, showAnswer})}
        width={columnSizes['2']}
      />
      =
      <EquationElement
        element={equation.result}
        display={getDisplay({elementId: 'result', gap: equation.gap, showAnswer})}
        width={columnSizes.result}
      />
    </div>
  </EquationWrapper>);
}

export default Equation;