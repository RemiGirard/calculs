type StepList = [number, number, number, number, number];
type ScoreList = [number, number, number];

export default (exerciseListCount: number): [StepList, ScoreList] => {
  const stepList = [0, Math.round(exerciseListCount / 2), exerciseListCount];
  const completeStepList: StepList = [
    stepList[0],
    Math.max(stepList[0], stepList[1] - 1),
    stepList[1],
    Math.max(stepList[1], stepList[2] - 1),
    stepList[2],
  ];
  const scoreList: ScoreList = [1, 2, 3];

  return [completeStepList, scoreList];
};
