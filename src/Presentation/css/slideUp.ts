import {css} from "styled-components";

export default ({$display = true}) => css`
    transition: all 0.5s;
    transform: ${$display ? 'translateY(0)' : 'translateY(100%)'};
    opacity: ${$display ? '1' : '0'};
`;
