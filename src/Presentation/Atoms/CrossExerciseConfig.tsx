import CrossExerciseConfigWrapper from '@/Presentation/Atoms/CrossExerciseConfig.style.ts';

type componentProps = {
  onClick: () => void;
}

export default function ({ onClick }: componentProps) {
  return (<CrossExerciseConfigWrapper>
      <button onClick={onClick}>×</button>
    </CrossExerciseConfigWrapper>);
};
