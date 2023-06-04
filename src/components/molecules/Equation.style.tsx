import styled from 'styled-components';
import colors from '../../colors.json';

import { DisplayElementAnswer } from '../../routes/Exercice.type';

export const EquationWrapper = styled.div<{$dynamicFontSize: number;}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: ${({$dynamicFontSize}) => $dynamicFontSize.toString()}em;
  > div {
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`
export const EquationIdentifierWrapper = styled.div`
 color: ${colors.text.equationIdentifierColor};
 font-size: 0.5em;
 display: flex;
 align-items: center;
 height: 100%;
 width: 1em;
`;

export const EquationElementWrapper = styled.div<{$display: DisplayElementAnswer, $width: number}>`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  color: ${({$display}) => $display === 'showAnswer' ? colors.text.answerColor : ''};
  > :first-child {
    display: flex;
    justify-content: center;
    visibility: ${({$display}) => $display === 'hideAnswer' ? 'hidden' : 'visible'};
    width: ${({$width}) => ($width/1.5).toString()}em;
  }
  > :nth-child(2){
    position: absolute;
    display: flex;
    justify-content: center;
  }
`