import { styled } from "styled-components";
import colors from '../../../colors.json';

export const GlobalConfigInputWrapper = styled.div<{$isFocus: boolean}>`
  > select {
    background: none !important;
    font-family: arial-rounded-mt-bold;
    margin: 0;
    font-size: 1em;
    border: none;
    color: ${colors.text.light};
    > * {
      background-color: ${colors.blueShades[2]};
      font-family: arial-rounded-mt-bold;
      border: none;
      color: ${colors.text.light};
    }
  }
  > input {
    width: 50%;
    text-align: center;
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
`;