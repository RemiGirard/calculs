import styled from 'styled-components';
import colors from "@/Presentation/colors.ts";
import unselectable from "@/utils/Css/unselectable.ts";

export default styled.div<{$isType?: boolean}>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-top: 0.2em;
    padding-bottom: 0.2em;
    &:hover {
        background-color: ${colors.background};
    }

    > label {
        color: ${colors.category1};
        width: 20%;
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
              &:focus {
                  -webkit-appearance: initial;
              }
          }
  
          // Firefox
          &[type="number"] {
              -moz-appearance: textfield;
              &:focus {
                  -moz-appearance: initial;
              }
          }
      }
        
      > div {}
    }
`;
