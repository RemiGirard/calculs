import { useRef, useState } from "react";
import { InputWrapper } from "./Input.style";

const Input = ({value, setValue, label = '', unit = '', style = {}}: any) => {
  const inputElement = useRef<null | HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (<InputWrapper
    onClick={() => {inputElement?.current?.focus(); setIsFocus(true);}}
    $hasUnit={unit !== ''}
    tabIndex={0}
    onBlur={() => {setIsFocus(false)}}
    $isFocus={isFocus}
    $labelSize={label.split('').length}
    style={style}
    >
    <label>{label}</label>
    <div>
      <input value={value} onChange={({target}) => setValue(target.value)} ref={inputElement}/>
      {unit ? <div>{unit}</div> : null}
    </div>
  </InputWrapper>);
};

export default Input;