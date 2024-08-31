import {useEffect} from "react";
import FinishWrapper from "@/Presentation/Pages/Finish.style.ts";
import {useRouter} from "@/Presentation/Router.tsx";
import Clapping from "@/Presentation/assets/clapping.png";
import CloseCross from "@/Presentation/assets/icons/CloseCross.tsx";
import TopAbsoluteNavigationButtons from "@/Presentation/Organisms/TopAbsoluteNavigationButtons.tsx";
import quitGame from "@/Domain/Game/UseCase/quitGame.ts";
import useDisplayOnMouseMove from "@/utils/hook/useDisplayOnMouseMove.ts";
import dictionary from "@/Presentation/dictionary.ts";
import getStepListAndScoreList from "@/Domain/Score/getStepListAndScoreList.ts";

type componentProps = {
  numberOfCalcul: number,
}

export default ({ numberOfCalcul }: componentProps) => {
  const {navigate} = useRouter();
  const {display: displayButton} = useDisplayOnMouseMove({});

  const keyPressHandler = (event: KeyboardEvent) => {
    if(event.key === 'Escape') quitGame(navigate);
  }
  const pressCloseButtonHandler = () => quitGame(navigate);

  const getAnswerLineDisplay = () => {
    const [stepList, scoreList] = getStepListAndScoreList(numberOfCalcul);
    return dictionary.finishText(stepList, scoreList);
  };

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler);
    return () => document.removeEventListener('keydown', keyPressHandler);
  }, []);

  return (<FinishWrapper $displayButton={displayButton}>
    <TopAbsoluteNavigationButtons>
      <div />
      <button onClick={pressCloseButtonHandler}><CloseCross /></button>
    </TopAbsoluteNavigationButtons>
    <h1>{dictionary.finishTitle}</h1>
    <div>{getAnswerLineDisplay().map((line, index) => <div key={index}>{line}</div>)}</div>
    <div><img src={Clapping} alt={'clap'} /></div>
  </FinishWrapper>);
}
