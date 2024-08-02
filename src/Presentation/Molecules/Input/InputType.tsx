import { ChangeEvent } from 'react';
import { calcTypeList, CalcType } from '@/Domain/GenerateExercises/Entity/CalcTypeList.ts';
import dictionary from '@/Presentation/dictionary.ts';
import { setter } from '@/utils/Type/setter.ts';
import typedElementIfIncludedOrUndefined from '@/utils/typedElementIfIncludedOrUndefined.ts';

interface componentProps {
  value: CalcType;
  setValue: setter<CalcType>;
}

export default function ({ value, setValue }: componentProps) {
  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    const typedNewValue = typedElementIfIncludedOrUndefined(calcTypeList, newValue);
    if (typedNewValue === undefined) return;
    setValue(typedNewValue);
  };

  return (<div>
    <select value={value} onChange={onChangeHandler}>
      {calcTypeList.map((calcType) => {
          return (<option key={calcType} value={calcType}>{dictionary.calcTypes[calcType]}</option>);
      })}
    </select>
  </div>);
}
