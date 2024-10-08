import styled from 'styled-components';
import colors from "@/Presentation/colors.ts";
import unselectable from "@/Presentation/css/unselectable.ts";

export default styled.div<{$isType?: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  &:hover {
    background-color: ${colors.background};
  }

  > label {
    color: ${colors.category1};
    width: 20%;
    height: 100%;
    text-align: center;
    ${unselectable}
  }
  
  > div {
    display: flex;
    width: 80%;
    > select {
      background: none;
      border: medium;
      color: ${colors.mainText};
      width: ${({$isType}) => $isType ? '80%' : '60%'};
      font-size: inherit;
        > option {
            color: ${colors.mainText};
            background-color: ${colors.secondary};
        }
      &:hover {
          cursor: pointer;
      }
    }

    > input {
        background: none;
        border: medium;
        color: ${colors.mainText};
        text-align: center;
        outline: none;
        width: 20%;
        font-size: inherit;

        // Chromium
        &[type="number"]::-webkit-inner-spin-button,
        &[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        // Firefox
        &[type="number"] {
            -moz-appearance: textfield;
        }
    }
  }
`;
