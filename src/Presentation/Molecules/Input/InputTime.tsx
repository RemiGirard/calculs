import { ChangeEvent, useState } from 'react';
import InputWrapper from './InputTime.style.ts';
import { setter } from '@/utils/type/setter.ts';

type componentProps= {
  value: number,
  setValue: setter<number>,
  label?: string,
  unit?: string,
};

export default function({
  value, setValue, label = '', unit = ''
}: componentProps) {
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setIsEmpty(true);
      return;
    } else {
      setIsEmpty(false);
    }
    const newValue: number = Number(event.target.value);
    if (isNaN(newValue)) return;
    setValue(newValue);
  };

  const onFocusHandler = () => setIsFocused(true);
  const onBlurHandler = () => {
    setIsFocused(false);
    setIsEmpty(false);
  };

  return (<InputWrapper $isFocused={isFocused}>
    <div>
        <input
          value={!isEmpty ? value.toString() : ''}
          onChange={handleChange}
          type={'number'}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
    </div>
    <label>{label}</label>
    <div>
      <span>{unit}</span>
    </div>
  </InputWrapper>);
}
