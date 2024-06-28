import { ChangeEvent } from 'react';
import EquationConfig from '@/Domain/GenerateExercises/Entity/EquationConfig.ts';
import { setter } from '@/utils/Type/setter.ts';

type componentProps = {
  value: EquationConfig['possibleGaps'];
  setValue: setter<EquationConfig['possibleGaps']>;
}

export default function ({ value, setValue }: componentProps) {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, key: keyof EquationConfig['possibleGaps']) => {
    const newValue = event.target.checked;
    setValue({ ...value, [key]: newValue });
  };
  return (
    <>
      {(['first', 'second', 'result'] as const).map((key) => (
        <input
          key={key}
          type="checkbox"
          onChange={(e) => onChangeHandler(e, key)}
          checked={value[key]}
        />
      ))}
    </>
  );
}
