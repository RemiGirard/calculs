import {setter} from "@/utils/Type/setter.ts";
import {NumberRange, NumberRangeType, numberRangeTypes} from "@/Domain/GenerateExercises/Entity/NumberRange.ts";
import {ChangeEvent, useState} from "react";
import {defaultNumberGeneration} from "@/Domain/GenerateExercises/Entity/defaultExerciseList.ts";
import typedElementIfIncludedOrUndefined from "@/utils/typedElementIfIncludedOrUndefined.ts";

interface componentProps {
  value: NumberRange;
  setValue: setter<NumberRange>;
}

export default ({value, setValue} : componentProps) => {
  const defaultLocalValue = {
    fix: value.type === 'fix' ? value.fix : defaultNumberGeneration.fix,
    min: value.type === 'range' ? value.min : defaultNumberGeneration.range[0],
    max: value.type === 'range' ? value.max : defaultNumberGeneration.range[1],
    minTens: value.type === 'rangeTens' ? value.min : defaultNumberGeneration.rangeTens[0],
    maxTens: value.type === 'rangeTens' ? value.max : defaultNumberGeneration.rangeTens[1],
  };

  const [localValue, setLocalValue] = useState(defaultLocalValue);

  const generateValue = (type: NumberRangeType): NumberRange => {
    switch(type) {
      case 'fix':
        return {type: 'fix', fix: localValue.fix};
      case 'range':
        return {type: 'range', min: localValue.min, max: localValue.max};
      case 'rangeTens':
        return {type: 'rangeTens', min: localValue.minTens, max: localValue.maxTens};
      default:
        throw new Error(`Unexpected type: ${type}`);
    }
  }
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const newType = typedElementIfIncludedOrUndefined(numberRangeTypes, event.target.value);
    if(newType === undefined) return;
    setValue(generateValue(newType));
  }

  const updateLocalValue = (key: 'fix'|'min'|'max', newValue: number) => {
    let newLocalValue = {...localValue};
    let localKey: keyof typeof localValue = key;
    if(value.type === 'rangeTens' && key !== 'fix'){
      localKey = ({
        min: 'minTens',
        max: 'maxTens',
      } as const)[key];
    }

    newLocalValue[localKey] = newValue;
    setLocalValue(newLocalValue);
  }

  const onChangeNumberHandler = (event: ChangeEvent<HTMLInputElement>, key: 'fix'|'min'|'max') => {
    const newValue = Number(event.target.value);
    if(isNaN(newValue)) return;

    updateLocalValue(key, newValue);
    setValue({
      ...value,
      [key]: newValue,
    });
  }
  return (<>
    <select value={value.type} onChange={onChangeHandler}>
      {
        numberRangeTypes.map((numberRangeType) => {
          return <option key={numberRangeType} value={numberRangeType}>{numberRangeType}</option>;
        })
      }
    </select>
    {
      value.type === 'fix'
      && <input
            value={value.fix}
            onChange={(e) => onChangeNumberHandler(e, 'fix')}
            type={'number'}
        />
    }
    {
      (value.type === 'range' || value.type === 'rangeTens')
      && <input
            value={value.min}
            onChange={(e) => onChangeNumberHandler(e, 'min')}
            type={'number'}
        />
    }
    {
      (value.type === 'range' || value.type === 'rangeTens')
      && <input
            value={value.max}
            onChange={(e) => onChangeNumberHandler(e, 'max')}
            type={'number'}
        />
    }
  </>);
}