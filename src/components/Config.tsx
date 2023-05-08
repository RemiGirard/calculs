import Button from "./buttons/Button";

const Config = ({title, setStateGenerateExercices, config, setConfig}: any) => {
  // {
  //   default: {
  //     numberOfGroup: 2,
  //     group: {min: 1, max: 9},
  //     calcSpeRange: { min: 10, max: 50 },
  //     calcSpeNumber: { min: 10, max: 50 },
  //     calcType: '+',
  //     calcNumber: 6,
  //     difficulty: 1,
  //     questionDuration: isDevEnv ? 5 : 180,
  //     answerDuration: isDevEnv ? 5 : 60,
  //     gap: 'result',
  //   },
  //   displayLetterId: true,
  // }
  return (<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#000303', color: '#55cc55'}}>
    <h1>{title}</h1>
    <div>
      <Button onClick={setStateGenerateExercices} >close</Button>
    </div>
  </div>)
};

export default Config;