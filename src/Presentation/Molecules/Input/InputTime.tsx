import React, { useRef, useState } from 'react';
import { InputWrapper } from './InputTime.style.ts';
import { setter } from '@/utils/Type/setter.ts';

type componentProps<T extends string|number> = {
    value: T,
    setValue: setter<T>,
    label?: string,
    unit?: string,
    style?: React.CSSProperties
};

export default function<T extends string|number> ({
  value, setValue, label = '', unit = '',
}: componentProps<T>) {
  const inputElement = useRef<null | HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string|number = event.target.value;
    if (typeof value === 'number') {
      newValue = Number(newValue);
      if (isNaN(newValue)) return;
    }
    setValue(newValue as T);
  };

  return (
    <InputWrapper
      onClick={() => { inputElement?.current?.focus(); setIsFocus(true); }}
      $hasUnit={unit !== ''}
      tabIndex={0}
      onBlur={() => { setIsFocus(false); }}
      $isFocus={isFocus}
      $labelSize={label.split('').length}
    >
      <label>{label}</label>
      <div>
        <input value={value.toString()} onChange={handleChange} ref={inputElement} />
        {unit ? <div>{unit}</div> : null}
      </div>
    </InputWrapper>
  );
}
