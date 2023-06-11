import styled from "styled-components";
import colors from '../colors.json';

export const GenerateExercicesWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.blueShades[1]};
  font-family: 'arial-rounded-mt-bold';
`;

export const Title = styled.div`
  color: ${colors.blueShades[3]};
  font-size: 2.5em;
  padding: 2%;
`;

export const ExerciceConfigWrapper = styled.div<{$iseven: boolean}>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 99.2%;
  padding: 0.4%;
  height: 35%;
  background-color: ${({$iseven}) => $iseven ? colors.blueShades[4] : colors.blueShades[3]};
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

export const ColumnsConfigWrapper = styled.div`
  width: 70%;
  margin-right: 2%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: scroll;
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
