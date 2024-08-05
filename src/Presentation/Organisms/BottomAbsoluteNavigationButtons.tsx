import BottomAbsoluteNavigationButtonsWrapper from '@/Presentation/Organisms/BottomAbsoluteNavigationButtons.style';
import {ReactNode} from "react";

type componentProps = {
  children: ReactNode,
}
export default ({children}: componentProps) => {
  return (<BottomAbsoluteNavigationButtonsWrapper>
    {children}
  </BottomAbsoluteNavigationButtonsWrapper>);
};
