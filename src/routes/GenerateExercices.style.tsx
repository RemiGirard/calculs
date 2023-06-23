import styled from "styled-components";
import colors from '../colors.json';

export const GenerateExercicesWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 1000px;
  min-height: 800px;
  background-color: ${colors.blueShades[1]};
  font-family: 'arial-rounded-mt-bold';
`;

export const TopBar = styled.div`
  width: 98%;
  height: 10%;
  margin: 1%;
  margin-top: 0%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div<{$titleLength: number}>`
  width: ${props => props.$titleLength*1.6}%;
  color: ${colors.blueShades[3]};
  font-size: 2.5em;
  padding: 2%;
`;

export const ExercicesConfigWrapper = styled.div`
  width: 98%;
  margin: 1%;
  height: 70%;
  display: flex;
  flex-direction: row;
  
  > div:first-child {
    width: 98%;
    height: 98%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`

export const ExerciceConfigWrapper = styled.div<{$iseven: boolean}>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 99.2%;
  padding: 0.4%;
  height: 35%;
  background-color: ${({$iseven}) => $iseven ? colors.blueShades[4] : colors.blueShades[3]};
`;

export const TimeAndActionButtonsWrapper = styled.div`
  width: 15%;
  height: 100%;
  margin-right: 0.3%;
  display: flex;
  flex-direction: column;
`;

export const TimeConfigWrapper = styled.div`
  width: 100%;
  height: 90%;
  background-color: ${colors.blueShades[2]};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  > div {
    margin: 3%;
    margin-bottom: 0%;
  }
  > div:last-child{
    margin-bottom: 3%;
  }
`

export const ActionButtonsWrapper = styled.div`
  height: 9%;
  padding-top: 1.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
`;

export const ActionButton = styled.div<{$isVisible: boolean}>`
  width: 12%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  visibility: ${({$isVisible}) => $isVisible ? 'visible' : 'hidden'};
`;

export const ColumnsConfigWrapper = styled.div`
  width: 99%;
  margin-right: 2%;
  padding-bottom: 0.5%;
  @-moz-document url-prefix() {
    padding-bottom: 2%;
  }
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow-x: auto;

  /* WebKit-based browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    height: 1em;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.blueShades[2]};
    border-radius: 15px;
  }

  /* Mozilla Firefox */
  scrollbar-color: ${colors.blueShades[1]} transparent;
  scrollbar-width: auto;

  ::-moz-scrollbar {
    height: 20px;
  }

  ::-moz-scrollbar-track {
    background: pink;
  }

  ::-moz-scrollbar-thumb {
    background-color: ${colors.blueShades[2]};
    border-radius: 15px;
  }
  > div {
    background-color: ${colors.blueShades[2]};
    color: ${colors.text.light};
    width: 40%;
    min-width: 40%;
    border-radius: 5px;
    padding: 0.5%;
    margin-right: 1%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  > div:last-child{
    width: 6%;
    min-width: 6%;
    justify-content: center;
    align-items: center;
    font-size: 2.5em;
    &:hover {
      background-color: ${colors.blueShades[3]};
    }
  }
`;

export const BigActionButton = styled.div<{$textColor?: string, $color?: string, $textColorHover?: string, $colorHover?: string}>`
  color: ${({$textColor})=>$textColor ?? 'white'};
  background-color: ${({$color})=>$color ?? 'green'};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4em;
  cursor: pointer;
  &:hover {
    background-color: ${({$colorHover})=>$colorHover ?? 'green'};
  }
`;