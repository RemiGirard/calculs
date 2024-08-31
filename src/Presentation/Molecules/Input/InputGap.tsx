import {KeyboardEvent} from "react";

import EquationConfig from '@/Domain/GenerateExercises/Entity/EquationConfig.ts';
import { setter } from '@/utils/type/setter.ts';
import dictionary from "@/Presentation/dictionary.ts";
import InputGapWrapper from "@/Presentation/Molecules/Input/InputGap.style.ts";

type componentProps = {
  value: EquationConfig['possibleGaps'];
  setValue: setter<EquationConfig['possibleGaps']>;
}

export default function ({ value, setValue }: componentProps) {
  const onChangeHandler = (key: keyof EquationConfig['possibleGaps']) => {
    const newValue = !value[key];
    setValue({ ...value, [key]: newValue });
  };

  const onKeyDownHandler = (event:  KeyboardEvent<HTMLDivElement>, key: keyof EquationConfig['possibleGaps']) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onChangeHandler(key);
    }
  }

  return (<InputGapWrapper>
      {(['first', 'second', 'result'] as const).map((key) => (<div
        key={key}
        onClick={() => onChangeHandler(key)}
        onKeyDown={(event) => onKeyDownHandler(event, key)}
        tabIndex={0}
      >
        <span>{value[key] ? '☑' : '☐'}</span> {dictionary.inputGapLabel[key]}
      </div>))}
    </InputGapWrapper>
  );
}
