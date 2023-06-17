import { MouseEventHandler, UIEventHandler, useCallback, useEffect, useRef, useState } from "react";

const useScrollBar = ({windowRef, contentRef, scrollTrackRef, direction = "vertical"}
    : {
        windowRef:React.RefObject<HTMLDivElement>,
        contentRef:React.RefObject<HTMLDivElement>,
        scrollTrackRef:React.RefObject<HTMLDivElement>,
        direction?: "vertical" | "horizontal",
    }) => {
  const [scrollBarSize, setScrollBarSize] = useState<number>(99);
  const [scrollContent, setScrollContent] = useState<number>(0);
  interface SizeParameters {
    offset: 'offsetHeight'|'offsetWidth',
    scroll: 'scrollHeight'|'scrollWidth',
    scrollRect: 'scrollTop'|'scrollLeft',
    client: 'clientHeight'|'clientWidth',
    rect: 'top'|'left',
    clickPosition: 'clientY'|'clientX',
  }
  const widthParameters:SizeParameters = {
    offset: 'offsetHeight',
    scroll: 'scrollHeight',
    scrollRect: 'scrollTop', 
    client: 'clientHeight',
    rect: 'top',
    clickPosition: 'clientY',
  };
  const heightParameters:SizeParameters = {
    offset: 'offsetWidth',
    scroll: 'scrollWidth',
    scrollRect: 'scrollLeft',
    client: 'clientWidth',
    rect: 'left',
    clickPosition: 'clientX',
  };
  const wOrH:SizeParameters = direction === "vertical" ? widthParameters : heightParameters;

  const handleScrollBarSizeChange = () => {
    const calculatedSize = (windowRef.current?.[wOrH.offset] ?? 1) / (contentRef.current?.[wOrH.scroll] ?? 1);
    setScrollBarSize(Math.max(calculatedSize*99, 10));
  };

  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialScrollDistance, setInitialScrollDistance] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTrackClick:MouseEventHandler<Element> = useCallback(
    (e: React.MouseEvent<Element, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
          // First, figure out where we clicked
          const clickPosition = e[wOrH.clickPosition];
          // Next, figure out the distance between the top of the track and the top of the viewport
          const target = scrollTrackRef.current as Element;
          const rect = target.getBoundingClientRect();

          const trackDistance = rect[wOrH.rect];
          // We want the middle of the thumb to jump to where we clicked, so we subtract half the thumb's height to offset the position
          const thumbOffset = -((scrollBarSize / 2)/100)*(windowRef.current?.[wOrH.offset] ?? 1);

          // Find the ratio of the new position to the total content length using the thumb and track values...
          const clickRatio = (clickPosition - trackDistance + thumbOffset) / trackCurrent[wOrH.client];
          // ...so that you can compute where the content should scroll to.
          const scrollAmount = Math.floor(clickRatio * contentCurrent[wOrH.scroll]);
          // And finally, scroll to the new position!
          contentCurrent.scrollTo({top: scrollAmount});
      }
    },
    [scrollBarSize]
  );

  const handleThumbMousedown:MouseEventHandler<Element> = useCallback((event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setScrollStartPosition(event[wOrH.clickPosition]);
    if (contentRef.current) setInitialScrollDistance(contentRef.current?.[wOrH.scrollRect]);
    setIsDragging(true);
  }, []);
  
  const handleThumbMouseup = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );
  
  const handleThumbMousemove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        const contentScrollSize = contentRef.current?.[wOrH.scroll] ?? 1;
        const contentOffsetSize = contentRef.current?.[wOrH.offset] ?? 1;
  
        // Subtract the current mouse y position from where you started to get the pixel difference in mouse position. Multiply by ratio of visible content height to thumb height to scale up the difference for content scrolling.
        const delta =
          (e[wOrH.clickPosition] - (scrollStartPosition ?? 0)) *
          (contentOffsetSize / scrollBarSize)*0.15;
        const newScrollStart = Math.min(
          initialScrollDistance + delta,
          contentScrollSize - contentOffsetSize
        );
        if(contentRef.current !== null){
          contentRef.current[wOrH.scrollRect] = newScrollStart;
        }
      }
    },
    [isDragging, scrollStartPosition, scrollBarSize]
  );
  // Listen for mouse events to handle scrolling by dragging the thumb
  useEffect(() => {
    document.addEventListener('mousemove', handleThumbMousemove);
    document.addEventListener('mouseup', handleThumbMouseup);
    document.addEventListener('mouseleave', handleThumbMouseup);
    return () => {
      document.removeEventListener('mousemove', handleThumbMousemove);
      document.removeEventListener('mouseup', handleThumbMouseup);
      document.removeEventListener('mouseleave', handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  useEffect(() => {
    if(windowRef.current){
      const windowObserver = new ResizeObserver(handleScrollBarSizeChange);
      windowObserver.observe(windowRef.current);
      return () => {windowObserver.disconnect();}
    }
    if(contentRef.current){
      const contentObserver = new ResizeObserver(() =>{
        console.debug('content changed');
        handleScrollBarSizeChange
      });
      contentObserver.observe(contentRef.current);
      return () => {contentObserver.disconnect();}
    }
  ;
  }, []);


  const scrollEvent:UIEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    setScrollContent(target[wOrH.scrollRect]);
  }
    return {handleThumbMousedown, handleTrackClick, handleScrollBarSizeChange, scrollEvent, scrollBarSize, scrollContent};
};

export default useScrollBar;