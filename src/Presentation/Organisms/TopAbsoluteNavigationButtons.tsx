import {ReactNode} from "react";
import TopAbsoluteNavigationButtonsWrapper from "@/Presentation/Organisms/TopAbsoluteNavigationButtons.style.tsx";

type componentProps = {
  children: ReactNode,
}
export default ({children}: componentProps) => {
  return (<TopAbsoluteNavigationButtonsWrapper>
    {children}
  </TopAbsoluteNavigationButtonsWrapper>);
};
