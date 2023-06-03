import { useRef, useState } from "react";
import { InputWrapper } from "./Input.style";

const Input = ({value, setValue, label = '', unit = ''}: any) => {
  const inputElement = useRef<null | HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (<InputWrapper
    onClick={() => {inputElement?.current?.focus(); setIsFocus(true);}}
    hasunit={unit !== ''}
    tabIndex={0}
    onBlur={() => {setIsFocus(false)}}
    isFocus={isFocus}
    >
    <label>{label}</label>
    <div>
      <input value={value} onChange={({target}) => setValue(target.value)} ref={inputElement}/>
      {unit ? <div>{unit}</div> : null}
    </div>
  </InputWrapper>);
};

export default Input;