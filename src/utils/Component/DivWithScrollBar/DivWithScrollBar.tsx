import {ReactNode, useEffect, useRef} from "react";
import useScrollBar from "@/utils/Component/DivWithScrollBar/useScrollBar.tsx";
import DivWithScrollBarWrapper from "@/utils/Component/DivWithScrollBar/DivWithScrollBarWrapper.tsx";

const defaultConfig = {
  isHorizontal: false,
  color: 'black',
};

type componentProps = {
  children: ReactNode;
  config?: Partial<typeof defaultConfig>;
}

export default ({children, config: passedConfig}: componentProps) => {
  const config = {...defaultConfig, ...passedConfig};
  const windowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  
  const {
    handleThumbMousedown,
    handleTrackClick,
    handleScrollBarSizeChange,
    scrollEvent,
    scrollBarSize,
    scrollContentPercentage,
  } = useScrollBar({
    windowRef: windowRef,
    contentRef: contentRef,
    scrollTrackRef: scrollTrackRef,
    direction: config.isHorizontal ? 'horizontal' : 'vertical',
  });

  useEffect(() => {
    handleScrollBarSizeChange();
  }, [children]);


  return (<DivWithScrollBarWrapper
    ref={windowRef}
    $isHorizontal={config.isHorizontal}
    $scrollContentPercentage={scrollContentPercentage}
    $scrollBarSize={scrollBarSize}
    $color={config.color}
    $displayScrollBar={scrollBarSize < 99}
  >
    <div ref={contentRef} onScroll={scrollEvent}>{children}</div>
    <div ref={scrollTrackRef} className={'scrollTrackRef'} onMouseDown={handleThumbMousedown}>
      <div onClick={handleTrackClick}/>
      <div />
      <div />
    </div>
  </DivWithScrollBarWrapper>)
};