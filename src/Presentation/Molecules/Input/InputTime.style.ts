import { styled } from 'styled-components';
import colors from '@/Presentation/colors.ts';
import unselectable from "@/Presentation/css/unselectable.ts";

export default styled.fieldset<{
  $isFocus: boolean,
  $labelSize: number,
}>`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  &:hover{
    background-color: ${colors.background};
  }
  > label {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    color: ${colors.category2};
    font-size: 1em;
    cursor: pointer;
    width: 100%;
    height: 30%;
    text-align: center;
    ${unselectable}
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
      text-align: right;
      border:none;
      background-image:none;
      background-color:transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      color: ${colors.mainText};
      font-size: 1.5em;
      font-weight: ${({ $isFocus }) => ($isFocus ? 1000 : null)};
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
    > span { // unit
        width: 20%;
        ${unselectable}
    }
  }
`;
