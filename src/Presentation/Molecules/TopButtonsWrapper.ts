import styled from 'styled-components';
import colors from '@/Presentation/colors.ts';

export default styled.div`
    width: 10%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    > button {
        // reset button style
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        border: none;
        background-color: ${colors.main};
        cursor: pointer;
        &:hover {
            background-color: ${colors.mainHighlight};
        }
        > svg {
            width: 50%;
        }
    }
`;
