import styled from "styled-components";

export default styled.div<{
  $isHorizontal?: boolean,
  $scrollContentPercentage: number,
  $scrollBarSize: number,
  $color: string,
  $displayScrollBar: boolean
}>`
  display: flex;
  flex-direction: ${props => props.$isHorizontal ? 'column' : 'row'};
  width: 100%;
  height: ${({$isHorizontal}) => $isHorizontal ? '' : '100%'};
  & > div:first-child {
    width: ${({$isHorizontal}) => $isHorizontal ? '' : '100%'};
    height: ${({$isHorizontal}) => $isHorizontal ? '100%' : ''};
    overflow-x: ${({$isHorizontal}) => $isHorizontal ? 'scroll' : 'visible'};
    overflow-y: ${({$isHorizontal}) => $isHorizontal ? 'visible' : 'scroll'};
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }
  }
  & > div:last-child {
    display: flex;
    flex-direction: ${props => props.$isHorizontal ? 'row' : 'column'};
    align-items: center;
    padding-top: 0.2%;
    padding-bottom: 0.2%;
    position: relative;
    width: ${({$isHorizontal}) => $isHorizontal ? '100%' : '15px'};
    height: ${({$isHorizontal}) => $isHorizontal ? '15px' : '100%'};
      > div:nth-child(1) {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
      }
      > div:nth-child(2) { // top space to move scroll bar
        height: ${({$isHorizontal, $scrollContentPercentage}) => $isHorizontal ? '100%' : $scrollContentPercentage+'%'};
        width: ${({$isHorizontal, $scrollContentPercentage}) => $isHorizontal ? $scrollContentPercentage+'%' : '100%'};
      }
      > div:nth-child(3) { // scroll bar
        background-color: ${({$color, $displayScrollBar}) => $displayScrollBar ? $color : 'none'};
        border-radius: 35px;
        width: ${({$isHorizontal, $scrollBarSize}) => $isHorizontal ? $scrollBarSize+'%' : '100%'};
        height: ${({$isHorizontal, $scrollBarSize}) => $isHorizontal ? '15px' : $scrollBarSize+'%'};
        z-index: 1000;
      }
  }
`;
