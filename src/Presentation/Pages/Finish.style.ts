import styled from "styled-components";
import colors from "@/Presentation/colors.ts";
import slideDown from "@/Presentation/css/slideDown.ts";

export default styled.div<{$displayButton: boolean}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${colors.mainTextAlternate};
    > h1 {
        text-align: center;
        font-size: 6em;
        margin-bottom: 0.5em;
    }
    > div {
        &:nth-child(1) {
            ${({$displayButton}) => slideDown({$display: $displayButton})};
            > button {
                min-height: 100px;
                height: 10%;
                min-width: 100px;
                width: 8%;
                border: none;
                color: ${colors.mainText};
                background-color: ${colors.main};
                border-radius: 10em;
                &:hover {
                    background-color: ${colors.secondary};
                }
                > svg {
                    width: 100%;
                    height: 100%;
                    stroke-width: 2;
                }
            }
        }
        &:nth-child(3) {
            div {
                font-size: 4vw;
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
        }
        &:nth-child(4) {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            background-color: ${colors.finishImage};
            z-index: -10;
            > img {
                width: 1000px;
                height: 500px;
            }
        }
    }
`;
