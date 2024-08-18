import styled from "styled-components";

export default styled.div<{$fontSize: number}>`
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    > div {
        display: table;
        font-size: ${({$fontSize})=>$fontSize}em;
    }  
`;