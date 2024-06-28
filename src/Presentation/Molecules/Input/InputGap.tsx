import EquationConfig from "@/Domain/GenerateExercises/Entity/EquationConfig.ts";
import {setter} from "@/utils/Type/setter.ts";
import {ChangeEvent} from "react";

type componentProps = {
  value: EquationConfig['possibleGaps'];
  setValue: setter<EquationConfig['possibleGaps']>;
}

export default ({value, setValue}: componentProps) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, key: keyof EquationConfig['possibleGaps']) => {
    const newValue = event.target.checked;
    setValue({...value, [key]: newValue});
  };
  return (<>
    {(['first', 'second', 'result'] as const).map((key) => {
      return <input
        key={key}
        type='checkbox'
        onChange={(e) => onChangeHandler(e, key)}
        checked={value[key]}
      />
    })}
  </>);
};