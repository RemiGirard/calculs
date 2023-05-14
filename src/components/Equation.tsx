import { useEffect, useState } from "react";
import dictionary from '../dictionary.json'


const Equation = ({currCalcul, index, calculGroupIndex, calculGroup, config, showResult, calcType, updateParentTextSize, groupSizes, dynamicFontSize}) => {

  


  useEffect(() => {
    let textCount = 0;
    const incTextSize = (number = 1) => {
      textCount = textCount+number;
    }

    if(config.displayLetterId){
      incTextSize();
    }
    // add size first element
    incTextSize(currCalcul[1].toString().length)
    incTextSize(2);
    incTextSize(currCalcul[2].toString().length)
    incTextSize(2);

    if(currCalcul.calcType === '%') {
      incTextSize(3)
    } else {
      incTextSize(currCalcul['result'].toString().length)
    }
    updateParentTextSize(textCount)
  }, [config])



  

  const getModuloResultDisplay = (quotient:any, remainder:any) => {
    return (<div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{fontSize: '0.5em'}}>quotient: {quotient}</div>
        <div  style={{fontSize: '0.5em'}}>reste: {remainder}</div>
    </div>)
}

  const displayCalcElement = (currCalcul:any, element:any, showResult:any) => {
    const isToDisplay = currCalcul.gap !== element || showResult;
   
    return (<div
      style={{
        display: 'flex',
        justifyContent: 'center',
        color: currCalcul.gap === element && showResult ? '#00ff06' : '', width: '100%',position: 'relative'
      }}>
        <div style={{visibility: isToDisplay ? 'visible' : 'hidden', width: (groupSizes[element]/1.5).toString() + 'em', display: 'flex', justifyContent: 'center'}}>
          {
          element === 'result' && calcType === '%'
              ? getModuloResultDisplay(currCalcul.result[0], currCalcul.result[1])
              : currCalcul[element]
          }
        </div>
        <div style={{position: 'absolute', display: 'flex', justifyContent: 'center'}}>{isToDisplay ? null : '..'}</div>
     
    </div>)
  }


  function integerToLetter(integer:any) {
    if (integer < 1 || integer > 26) {
      return ' ';
    }
    
    // Convert the integer to a character code by adding 64
    var charCode = integer + 96;
    
    // Convert the character code to a letter
    var letter = String.fromCharCode(charCode);
    
    return letter;
  }

  
  return (<div key={index} className="fontsetter" style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              width: '100%', height: '100%',
              backgroundColor: index %2 ? ( calculGroupIndex %2 ? 'red' : 'blue') : ( calculGroupIndex %2 ? 'green' : 'pink'),
              fontSize: dynamicFontSize.toString() + 'em',
              }}>
      {config.displayLetterId
        ? <div style={{color: '#0a4663', fontSize: '0.5em', display: 'flex', alignItems: "center", height: '100%', width: '1em' }} >
            <div style={{display: 'flex', alignItems: 'flex-end', paddingRight: '1em'}}><div style={{width: '0.5em'}}>{integerToLetter(calculGroupIndex*(calculGroup.length) + (index+1))}</div>. </div>
            </div>
        : null
      }
      <div style={{display: 'flex', flexDirection: 'row', height: '100%', justifyContent: 'center', alignItems: 'center'}}> 
          {displayCalcElement(currCalcul, 1, showResult)}
          {dictionary.calcCharacter[calcType] ?? calcType}
          {displayCalcElement(currCalcul, 2, showResult)}
          =
          {displayCalcElement(currCalcul, 'result', showResult)}
      </div>
  </div>);
}

export default Equation;