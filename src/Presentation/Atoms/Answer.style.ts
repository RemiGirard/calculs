import styled from "styled-components";
import colors from "@/Presentation/colors.ts";

export default styled.div<{ $displayAnswer: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: ${colors.category1};
    > div:nth-child(1) {
        display: flex;
        justify-content: center;
        position: absolute;
        visibility: ${({ $displayAnswer }) => $displayAnswer ? 'hidden' : ''};
    }
    >div:nth-child(2) {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        visibility: ${({ $displayAnswer }) => $displayAnswer ? '' : 'hidden'};
    }
`