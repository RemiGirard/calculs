import styled from 'styled-components';
import colors from "@/Presentation/colors.ts";

export default styled.div`
    width: 99%;
    display: flex;
    flex-direction: row;
    padding: 0.5% 0.5% 0.5% 0.5%;
    > div {
        margin-right: 4px;
        &:nth-child(1) {
            width: 15%;
            > div:nth-child(1) {
                background-color: ${colors.secondary};
                border-radius: 2px;
            }
        }
        &:nth-child(2) {
            width: 64%;
            display: flex;
            flex-direction: column;
        }
        &:nth-child(3) {
            width: 20%;
            height: 250px;
            display: flex;
            overflow: hidden;
            margin-right: 0;
            background-color: ${colors.secondary};
        }
    }
`;
