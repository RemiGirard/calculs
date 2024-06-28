import { ChangeEvent } from 'react';
import { calcTypes, CalcType } from '@/Domain/GenerateExercises/Entity/CalcTypes.ts';
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
    const typedNewValue = typedElementIfIncludedOrUndefined(calcTypes, newValue);
    if (typedNewValue === undefined) return;
    setValue(typedNewValue);
  };

  return (
    <select value={value} onChange={onChangeHandler}>
      {
        calcTypes.map((calcType) => <option key={calcType} value={calcType}>{dictionary.calcTypes[calcType]}</option>)
      }
    </select>
  );
}
