import styled from 'styled-components';
import colors from "@/Presentation/colors.ts";

export default styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    > div {
        display: flex;
        flex-shrink: 0;
        background-color: ${colors.secondary};
        border-radius: 2px;
        margin-right: 0.5%;
        width: 300px;
        overflow: hidden;
    }
    > button:last-child {
        display: flex;
        min-width: 50px;
        background-color: ${colors.secondary};
        border: none;
        border-radius: 2px;
        color: inherit;
        font-size: 1.5em;
        justify-content: center;
        align-items: center;
        &:hover {
            cursor: pointer;
        }
    }
`;
