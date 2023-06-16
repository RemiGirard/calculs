import { styled } from 'styled-components';

import colors from '../../../colors.json';

const labelWidth = {
  normal: 98,
  reduced: 70,
}

export const ColumnInputWrapper = styled.div<{$isFocus: boolean, $reducedWidth: boolean}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.blueShades[1]};
  margin: 1%;
  border-radius: 10px;
  cursor: pointer;
  width: ${({$reducedWidth}) => $reducedWidth ? labelWidth.reduced : labelWidth.normal}%;
  min-height: 2em;
  &:hover{
    background-color: ${colors.blueShades[4]};
  }
  > label {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.text.green};
    font-size: 1em;
    height: 1.5em;
    cursor: pointer;
    width: ${({$reducedWidth}) => $reducedWidth ? (20/labelWidth.reduced)*100 : (20/labelWidth.normal)*100}%;
  }
  > div {
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${colors.text.light};
    font-size: 1em;
    > select {
      background: none !important;;
      font-family: arial-rounded-mt-bold;
      margin: 0;
      > * {
        background: none !important;;
        font-family: arial-rounded-mt-bold;
        color: black;
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
  }
`;