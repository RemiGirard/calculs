import {ChangeEvent, useRef, useState} from "react";

type componentProps = {
  value: string;
  setValue: (value: string) => void;
  type: string;
}

export default ({value, setValue, type}: componentProps) => {
  const inputElement = useRef<null | HTMLInputElement>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setIsEmpty(true);
      return;
    } else {
      setIsEmpty(false);
    }
    setValue(event.target.value);
  }

  const onBlurHandler = () => {
    setIsEmpty(false);
  };

  const onFocusHandler = () => {
    inputElement.current?.select();
  }

  return (
    <input
      ref={inputElement}
      value={!isEmpty ? value : ''}
      onChange={onChangeHandler}
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
      type={type}
    />
  );
}