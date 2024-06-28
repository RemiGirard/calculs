import InputType from "@/Presentation/Molecules/Input/InputType.tsx";
import InputColumnWrapper from "@/Presentation/Molecules/Input/InputColumnWrapper.ts";
import InputNumber from "@/Presentation/Molecules/Input/InputNumber.tsx";
import InputGap from "@/Presentation/Molecules/Input/InputGap.tsx";

type componentsProps = {
  label: string;
  type: 'type'| 'number' | 'gap';
}

const inputsTable = {
  type: InputType,
  number: InputNumber,
  gap: InputGap,
}

export default ({label, type}: componentsProps) => {
  const Inputs = inputsTable[type];

  return (<InputColumnWrapper>
    <label>{label}</label>
    <Inputs />
  </InputColumnWrapper>);
}