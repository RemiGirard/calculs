import { styled } from 'styled-components';

import colors from '../../../colors.json';

export const InputWrapper = styled.div<{$hasUnit: boolean, $isFocus: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${colors.blueShades[1]};
  margin: 5%;
  border-radius: 7%;
  cursor: pointer;
  &:hover{
    background-color: ${colors.blueShades[4]};
  }
  > label {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: ${colors.text.pink};
    font-size: 1em;
    height: 1.5em;
    cursor: pointer;
  }
  > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    color: ${colors.text.light};
    font-size: 1.5em;
    > input {
      width: 50%;
      text-align: ${({$hasUnit = false}) => $hasUnit ? 'right' : 'center'};
      border:none;
      background-image:none;
      background-color:transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      color: ${colors.text.light};
      font-size: 1.5em;
      font-weight: ${({$isFocus}) => $isFocus ? 1000 : null};
      cursor: pointer;
      outline: none;
      &:focus{
        border:none;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        background-image:none;
        background-color:transparent;
        outline: none;
      }
    }
  }
`;