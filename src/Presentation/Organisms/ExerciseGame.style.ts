import styled from "styled-components";
import colors from "@/Presentation/colors.ts";

export default styled.div<{$fontSize: number}>`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    background-color: ${colors.secondary};
    > div {
        display: table;
        font-size: ${({$fontSize})=>$fontSize}em;
    }  
`;