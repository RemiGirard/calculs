import {ChangeEvent, useState} from 'react';
import { setter } from '@/utils/Type/setter.ts';
import { NumberRange, numberRangeTypes } from '@/Domain/GenerateExercises/Entity/NumberRange.ts';
import { defaultNumberGeneration } from '@/Domain/GenerateExercises/Entity/defaultExerciseList.ts';
import typedElementIfIncludedOrUndefined from '@/utils/typedElementIfIncludedOrUndefined.ts';
import InputInteractive from "@/Presentation/Atoms/InputInteractive.tsx";

interface componentProps {
  value: NumberRange;
  setValue: setter<NumberRange>;
}

export default function ({ value, setValue } : componentProps) {

  const defaultLocalValue = {
    fix: value.type === 'fix' ? value.fix : defaultNumberGeneration.fix,
    min: value.type === 'range' ? value.min : defaultNumberGeneration.range[0],
    max: value.type === 'range' ? value.max : defaultNumberGeneration.range[1],
    minTens: value.type === 'rangeTens' ? value.min : defaultNumberGeneration.rangeTens[0],
    maxTens: value.type === 'rangeTens' ? value.max : defaultNumberGeneration.rangeTens[1],
  };

  const [localValue, setLocalValue] = useState(defaultLocalValue);

  const typeTable = ({
    fix: {type: 'fix', fix: localValue.fix },
    range: {type: 'range', min: localValue.min, max: localValue.max },
    rangeTens: {type: 'rangeTens', min: localValue.minTens, max: localValue.maxTens },
  } as const);

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const newType = typedElementIfIncludedOrUndefined(numberRangeTypes, event.target.value);
    if (newType === undefined) return;
    setValue(typeTable[newType]);
  };

  const updateLocalValue = (key: 'fix'|'min'|'max', newValue: number) => {
    const newLocalValue = { ...localValue };
    let localKey: keyof typeof localValue = key;
    if (value.type === 'rangeTens' && key !== 'fix') {
      localKey = ({
        min: 'minTens',
        max: 'maxTens',
      } as const)[key];
    }

    newLocalValue[localKey] = newValue;
    setLocalValue(newLocalValue);
  };

  const setValueNumberHandler = (stringValue: string, key: 'fix'|'min'|'max') => {
    const newValue = Number(stringValue);
    if (isNaN(newValue)) return;

    updateLocalValue(key, newValue);
    setValue({
      ...value,
      [key]: newValue,
    });
  };
  return (
    <div>
      <select value={value.type} onChange={onChangeHandler}>
        {numberRangeTypes.map((numberRangeType) => {
          return <option key={numberRangeType} value={numberRangeType}>{numberRangeType}</option>
        })}
      </select>
      {
      value.type === 'fix'
      && (
      <InputInteractive
        value={String(value.fix)}
        setValue={(v) => setValueNumberHandler(v, 'fix')}
        type="number"
      />
      )
    }
      {
      (value.type === 'range' || value.type === 'rangeTens')
      && (
      <InputInteractive
        value={String(value.min)}
        setValue={(v) => setValueNumberHandler(v, 'min')}
        type="number"
      />
      )
    }
    {(value.type === 'range' || value.type === 'rangeTens')
      && (
      <InputInteractive
        value={String(value.max)}
        setValue={(v) => setValueNumberHandler(v, 'max')}
        type="number"
      />
    )}
    </div>
  );
}
