import styled from "styled-components";
import colors from "@/Presentation/colors.ts";
import slideDown from "@/Presentation/css/slideDown.ts";
import slideUp from "@/Presentation/css/slideUp.ts";

export default styled.div<{$displayButtons: boolean}>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${colors.secondary};
    > div {
        &:nth-child(1) {
            height: 90%;
        }
        &:nth-child(2) {
            height: 10%;
            width: 100%;
        }
        &:nth-child(3), &:nth-child(4) {
            > button {
                min-height: 100px;
                height: 20%;
                min-width: 100px;
                width: 12%;
                border: none;
                color: ${colors.mainText};
                background-color: ${colors.main};
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
        &:nth-child(3) {
            ${({$displayButtons}) => slideDown({$display: $displayButtons})};
        }
        &:nth-child(4) {
            ${({$displayButtons}) => slideUp({$display: $displayButtons})};
            > button:nth-child(2) {
                > svg {
                    stroke-width: 0.5;
                }
            }
        }
    }
`;