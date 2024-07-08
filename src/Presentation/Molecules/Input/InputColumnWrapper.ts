import styled from 'styled-components';
import colors from "@/Presentation/colors.ts";

export default styled.div<{$hasSpaceLeft?: boolean}>`
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
    }
    
    > div {
        display: flex;
      width: ${({$hasSpaceLeft}) => $hasSpaceLeft ? '60%' : '80%'};
      > select {
          background: none;
          border: medium;
          color: ${colors.mainText};
          width: 40%;
      }
  
      > input {
          background: none;
          border: medium;
          color: ${colors.mainText};
          text-align: center;
          outline: none;
          width: 20%;
  
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
