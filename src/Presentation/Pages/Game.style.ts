import styled from "styled-components";
import colors from "@/Presentation/colors.ts";

export default styled.div<{$fontSize: number}>`
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
`;