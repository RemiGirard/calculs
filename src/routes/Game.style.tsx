import { styled } from "styled-components";
import colors from '../colors.json';

export const GameWrapper = styled.div<{$fontSize: number}>`
  width: 100%;
  height: 100%;
  background-color: ${colors.game.background};
  color: #dddddd;
  font-family: arial-rounded-mt-bold;
  font-weight: bold;
  font-size: ${({$fontSize})=>$fontSize.toString()}em;
  display: flex;
  justify-content: center;
  > div {
    width: 95%;
    height: 85%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export const ColumnWrapper = styled.div<{$columnLength: number}>`
  display: flex;
  flex-direction: column;
  width: ${({$columnLength}) => (1/($columnLength)*100).toString()}%;
  height: 100%;
`;