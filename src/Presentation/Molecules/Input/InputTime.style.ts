import { styled } from 'styled-components';
import colors from "@/Presentation/colors.ts";

export const InputWrapper = styled.fieldset<{
  $hasUnit: boolean,
  $isFocus: boolean,
  $labelSize: number,
}>`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover{
    background-color: ${colors.secondary};
  }
  > label {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: ${colors.category2};
    font-size: ${({$labelSize}) => $labelSize > 10 ? 0.8 : 1}em;
    cursor: pointer;
    width: 100%;
    height: 30%;
  }
  > div {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    color: ${colors.mainText};
    font-size: 1.1em;
    > div {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > input {
      width: 50%;
      height: 100%;
      text-align: ${({$hasUnit = false}) => $hasUnit ? 'right' : 'center'};
      border:none;
      background-image:none;
      background-color:transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      color: ${colors.mainText};
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