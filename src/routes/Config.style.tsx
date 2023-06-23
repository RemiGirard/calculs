import { styled } from "styled-components";
import colors from '../colors.json';

export const ConfigWrapper = styled.div`
    color: ${colors.text.globalConfig};
    background-color: #070707;
    font-family: 'Courier New', monospace;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ExitButton = styled.button`
    font-family: inherit;
    font-size: 100%;
    background-color: transparent;
    color: ${colors.text.globalConfig};
    border: none;
    padding: 0;
    cursor: pointer;
    &:hover {
        color: ${colors.text.globalConfigHover}
    }
`;