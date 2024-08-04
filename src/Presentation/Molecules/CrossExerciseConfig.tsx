import CrossExerciseConfigWrapper from '@/Presentation/Molecules/CrossExerciseConfigWrapper.ts';

type componentProps = {
  onClick: () => void;
}

export default function ({ onClick }: componentProps) {
  return (<CrossExerciseConfigWrapper>
      <button onClick={onClick}>×</button>
    </CrossExerciseConfigWrapper>);
};
