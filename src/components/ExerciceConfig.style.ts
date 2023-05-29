import styled from 'styled-components';
import colors from '../colors.json';
import { ColumnInputWrapper } from './inputs/ColumnInput.style';

export const ExerciceConfigWrapper = styled.div<{iseven: boolean}>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 98%;
  padding: 1%;
  background-color: ${({iseven: iseven}: {iseven: boolean}) => iseven ? colors.blueShades[4] : colors.blueShades[3]};
`;

export const TimeConfigWrapper = styled.div`
  width: 100%;
  background-color: ${colors.blueShades[2]};
  border-radius: 3%;
`

export const ColumnsConfigWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: scroll;
  > div {
    background-color: ${colors.blueShades[2]};
    color: ${colors.text.light};
    width: 40%;
    min-width: 40%;
    border-radius: 3%;
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
