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
        margin-right: 4px;
        width: 300px;
        overflow: hidden;
    }
    > button:last-child {
        display: flex;
        min-width: 70px;
        background-color: ${colors.secondary};
        border: none;
        border-radius: 2px;
        color: inherit;
        font-size: 2.5em;
        font-weight: 1000;
        justify-content: center;
        align-items: center;
        &:hover {
            cursor: pointer;
        }
    }
`;
