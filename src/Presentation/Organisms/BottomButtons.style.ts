import styled from 'styled-components';
import colors from "@/Presentation/colors.ts";

export default styled.div`
    width: 96%;
    display: flex;
    justify-content: space-between;
    > button {
        min-width: 100px;
        background-color: ${colors.main};
        border: none;
        border-radius: 2px;
        &:hover {
            background-color: ${colors.mainHighlight};
        }
        > svg {
            width: 40px;
            height: 40px;
            stroke-width: 3;
        }
        &:last-child {
          background-color: ${colors.category1};
          &:hover {
            background-color: ${colors.category1Highlight};
          }
        }
    }
`;
