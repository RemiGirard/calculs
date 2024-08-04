import { ChangeEvent } from 'react';
import EquationConfig from '@/Domain/GenerateExercises/Entity/EquationConfig.ts';
import { setter } from '@/utils/Type/setter.ts';
import dictionary from "@/Presentation/dictionary.ts";
import InputGapWrapper from "@/Presentation/Molecules/Input/InputGap.style.ts";

type componentProps = {
  value: EquationConfig['possibleGaps'];
  setValue: setter<EquationConfig['possibleGaps']>;
}

export default function ({ value, setValue }: componentProps) {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, key: keyof EquationConfig['possibleGaps']) => {
    const newValue = event.target.checked;
    setValue({ ...value, [key]: newValue });
  };
  return (<InputGapWrapper>
      {(['first', 'second', 'result'] as const).map((key) => (<div key={key}>
        <label>{dictionary.inputGapLabel[key]}</label>
        <input
          type="checkbox"
          onChange={(e) => onChangeHandler(e, key)}
          checked={value[key]}
        />
      </div>))}
    </InputGapWrapper>
  );
}
