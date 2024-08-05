import Exercise from "@/Domain/GenerateExercises/Entity/Exercise.ts";
import GameWrapper from "@/Presentation/Pages/Game.style.ts";

type componentProps = {
  exerciseList: Exercise[],
}

export default ({ exerciseList }: componentProps) => {
  return (<GameWrapper>
    {exerciseList.map((exercise) => {
      return (<div key={exercise.uuid}>
        {JSON.stringify(exercise)}
      </div>);
    })}
  </GameWrapper>);
}