import BottomInputTimeButtonsWrapper from '@/Presentation/Molecules/BottomInputTimeButtonsWrapper.ts';
import Trash from "@/Presentation/assets/icons/Trash.tsx";

type componentProps = {
  deleteExercise: () => void;
  displayDelete: boolean;
}

export default ({ deleteExercise, displayDelete }: componentProps) => {
  return (
    <BottomInputTimeButtonsWrapper>
      <div />
      <div>
        {displayDelete && <button onClick={deleteExercise}><Trash /></button>}
      </div>
    </BottomInputTimeButtonsWrapper>
  );
}
