import { useRef, useState } from "react";
import { ColumnInputWrapper } from "./ColumnInput.style";
import { Case, Switch } from "../../../utils/Switch";
import { NumberTypes } from "../../../routes/ExerciceConfig.types";
import Arrow from '../../../assets/arrow.png';
import dictionaryTyped from '../../../dictionary.json';

const dictionary:any = dictionaryTyped;;

const ColumnInput = ({value, setValue, label = '', type = '', options = [], reducedWidth = false, fieldName = ''}: any) => {
  const inputElement = useRef<null | HTMLDivElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleTypeChange = (targetValue: string, key: string|number) => {
    const newValue = structuredClone(value);
    newValue[key] = targetValue;
    setValue(newValue);
  };

  const handleNumberChange = (targetValue: string, key: string|number) => {
    const newValue = structuredClone(value);
    const numberTargetValue = Number(targetValue);
    newValue[key] = isNaN(numberTargetValue) ? 0 : numberTargetValue;
    setValue(newValue);
  };

  return (<ColumnInputWrapper
    onClick={() => {inputElement?.current?.focus(); setIsFocus(true);}}
    tabIndex={0}
    onBlur={() => {setIsFocus(false)}}
    $isFocus={isFocus}
    $reducedWidth={reducedWidth}
    >
    <label>{label}</label>
    <div ref={inputElement}>
      <Switch expression={type}>
        <Case value={'select'}>
          <select value={value} onChange={({target}) => setValue(target.value)} >
            {options.map((option: any, index: number) => {
              return (<option key={index} value={option}>{dictionary.fields[fieldName+'s'][option] ?? option}</option>);
            })}
          </select>
        </Case>
        <Case value={'numberGeneration'}>
          <select
            value={value.type}
            onChange={({target}) => handleTypeChange(target.value, 'type')}
          >
            {NumberTypes.map((numberType, index) => {
              return (
                <option key={index} value={numberType}>{dictionary.fields.numberTypes[numberType] ?? numberType}</option>
              );
            })}
          </select>
          <Switch expression={value.type}>
            <Case value='fix'>
              <input value={value.fix} onChange={({target}) => {handleNumberChange(target.value, 'fix')}}/>
            </Case>
            <Case value='range'>
              <input value={value.min} onChange={({target}) => {handleNumberChange(target.value, 'min')}}/>
              <img src={Arrow} width={'15em'}></img>
              <input value={value.max} onChange={({target}) => {handleNumberChange(target.value, 'max')}}/>
            </Case>
            <Case value='rangeTens'>
              <input value={value.min} onChange={({target}) => {handleNumberChange(target.value, 'min')}}/>
              <img src={Arrow} width={'15em'}></img>
              <input value={value.max} onChange={({target}) => {handleNumberChange(target.value, 'max')}}/>
            </Case>
          </Switch>
          </Case>
          <Case value='answer'>
            {[1, 2, 'result'].map((element, index) => {
              return (<div
                key={index}
                style={{width: element === 'result' ? '150%': '100%', textAlign: 'center'}}
                onClick={() => {
                  const newValue = structuredClone(value);
                  newValue[element] = !newValue[element];
                  setValue(newValue);
                }}
                >
                  {value[element] ? '☑' : '☐'} {dictionary.fields.gaps[element] ?? element}
              </div>);
            })}
          </Case>
        </Switch>
    </div>
  </ColumnInputWrapper>);
};

export default ColumnInput;