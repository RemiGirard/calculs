import styled from "styled-components";
import colors from "@/Presentation/colors.ts";

export default styled.div`
    background: black;
    color: ${colors.category1};
    width: 100%;
    height: 100%;
    font-family: "Courier New", monospace;
    > button:nth-child(1) {
        position: absolute;
        right: 2%;
        top: 1%;
        background: none;
        border: none;
        color: inherit;
        font-size: inherit;
        padding: 0.5em;
        border-radius: 0.5em;
        &:hover {
            background: ${colors.category1Highlight};
            color: ${colors.category1};
        }
    }
    > h1 {
        text-align: center;
        margin: 0;
        padding: 0.2em;
        font-size: 5em;
    }
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        > div {
            width: 20%;
        }
    }
`;