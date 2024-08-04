import React, { useRef, useState } from 'react';
import InputWrapper from './InputTime.style.ts';
import { setter } from '@/utils/Type/setter.ts';

type componentProps= {
  value: number,
  setValue: setter<number>,
  label?: string,
  unit?: string,
  style?: React.CSSProperties,
};

export default function({
  value, setValue, label = '', unit = ''
}: componentProps) {
  const inputElement = useRef<null | HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const setFocusIn = () => {
    inputElement?.current?.focus();
    inputElement?.current?.select();
    setIsFocus(true);
  };

  const setFocusOut = () => {
    setIsFocus(false);
    setIsEmpty(false);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let newValue = value;
    if (event.key === 'ArrowUp') {
      newValue++;
    } else if (event.key === 'ArrowDown') {
      newValue--;
    }
    setValue(newValue);
  };

  return (<InputWrapper
    onClick={setFocusIn}
    $isFocus={isFocus}
    $labelSize={label.split('').length}
  >
    <label>{label}</label>
    <div>
      <input
        ref={inputElement}
        value={!isEmpty ? value.toString() : ''}
        onChange={handleChange}
        onBlur={setFocusOut}
        onKeyDown={keyDownHandler}
      />
      <span>{unit ?? null}</span>
    </div>
  </InputWrapper>);
}
