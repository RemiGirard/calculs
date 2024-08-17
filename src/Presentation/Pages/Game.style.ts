import styled from "styled-components";
import colors from "@/Presentation/colors.ts";
import slideDown from "@/Presentation/css/slideDown.ts";
import slideUp from "@/Presentation/css/slideUp.ts";

export default styled.div<{$fontSize: number, $displayButtons: boolean}>`
    width: 100%;
    height: 100%;
    background-color: ${colors.main};
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: ${({$fontSize}) => $fontSize}em;
    > div:nth-child(1) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        > div {
            display: flex;
            flex-direction: column;
        }
    }
    > div {
        &:nth-child(2), &:nth-child(3) {
            position: fixed;
            > button {
                min-height: 100px;
                height: 20%;
                min-width: 100px;
                width: 12%;
                border: none;
                color: ${colors.mainText};
                background-color: ${colors.secondary};
                opacity: 0.8;
                &:hover {
                    background-color: ${colors.mainHighlight};
                }

                > svg {
                    width: 100%;
                    height: 100%;
                    stroke-width: 2;
                }
            }
        }
        &:nth-child(2) {
            ${({$displayButtons}) => slideDown({$display: $displayButtons})};
        }
        &:nth-child(3) {
            ${({$displayButtons}) => slideUp({$display: $displayButtons})};
        }
    }
`;