import styled from "styled-components";

import colors from "@/Presentation/colors.ts";

export default styled.div`
    width: 100%;
    display: flex;
    > div {
        width: 98%;
        margin-right: 0.5%;
        >div {
            height: 100px;
            background-color: ${colors.secondary};
            &:nth-child(odd) {
                background-color: ${colors.main};
            }
        }
    }
    > aside {
        width: 2%;
        div {
            width: 100%;
            height: 100%;
            border-radius: 50px;
            background-color: ${colors.secondary};
        }
    }
`;