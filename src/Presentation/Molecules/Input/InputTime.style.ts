import { styled } from 'styled-components';
import colors from '@/Presentation/colors.ts';
import unselectable from "@/Presentation/css/unselectable.ts";

export default styled.fieldset<{$isFocused: boolean}>`
    //width: 100%;
    height: 70px;
    //height: auto;
    padding: 0;
    margin: 0;
    position: relative;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: ${({ $isFocused }) => $isFocused ? colors.background : ''};
    &:hover {
        background-color: ${colors.background};
    }
    >div:nth-child(1) {
        position: absolute;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        border-width: 0;
        > input {
            width: 100%;
            height: 90%;
            border: none;
            background: none;
            color: inherit;
            font-size: 1.5em;
            text-align: center;
            // set input at the bottom
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: textfield;
            //margin: 0;
            //padding: 0;
            vertical-align: bottom;
            padding: 5% 0 5% 0;
            &:focus {
                border: none;
                font-weight: 1000;
            }
        }
    }
    > label {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        color: ${colors.category2};
        font-size: 1em;
        cursor: pointer;
        width: 100%;
        height: 30%;
        text-align: center;
        padding-top: 3%;
        ${unselectable}
    }
    > div:nth-child(3) {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        > span { // unit
            width: 25%;
            margin-top: 5%;
            ${unselectable}
        }
    }
`;
