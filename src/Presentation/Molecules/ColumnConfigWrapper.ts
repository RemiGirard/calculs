import styled from 'styled-components';
import colors from "@/Presentation/colors.ts";

export default styled.div`
  //background-color: green;
  // background-color: ${colors.secondary};
  // border-radius: 10px;
  // margin-right: 0.5%;
  // width: 40%;
    > div:nth-child(2) {
        >div {
            margin-top: 0.2em;
            margin-bottom: 0.2em;
        }
    }
`;

export const AddEquationWrapper = styled.div`
 background-color: ${colors.secondary};
`;

export const ColumnConfigListWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    > div {
        display: flex;
        flex-shrink: 0;
        background-color: ${colors.secondary};
        border-radius: 10px;
        margin-right: 0.5%;
        width: 300px;
    }
    > button:last-child {
        width: 5%;
        background-color: ${colors.secondary};
        border: none;
        border-radius: 10px;
        color: inherit;
        font-size: 1.5em;
        justify-content: center;
        align-items: center;
        &:hover {
            cursor: pointer;
        }
    }
`;
