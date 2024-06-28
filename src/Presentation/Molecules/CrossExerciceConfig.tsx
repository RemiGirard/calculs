import CrossExerciceConfigWrapper from "@/Presentation/Molecules/CrossExerciceConfigWrapper.ts";

type componentProps = {
  onClick: () => void;
}

export default ({onClick}: componentProps) => {
  return (<CrossExerciceConfigWrapper>
      <div onClick={onClick}>×</div>
    </CrossExerciceConfigWrapper>);
}