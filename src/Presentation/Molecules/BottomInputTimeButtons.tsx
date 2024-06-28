import BottomInputTimeButtonsWrapper from "@/Presentation/Molecules/BottomInputTimeButtonsWrapper.ts";

type componentProps = {
  deleteExercise: () => void;
  displayDelete: boolean;
}

export default ({deleteExercise, displayDelete}: componentProps) => {
  return (<BottomInputTimeButtonsWrapper>
      <div></div>
      <div>
        {displayDelete && <button onClick={deleteExercise}>x</button>}
      </div>
    </BottomInputTimeButtonsWrapper>);
}