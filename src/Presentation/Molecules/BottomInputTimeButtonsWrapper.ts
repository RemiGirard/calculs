import styled from 'styled-components';
import colors from '@/Presentation/colors';

export default styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 1% 0 0 0;
    > div {
        width: 15%;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        > button {
            width: 100%;
            height: 100%;
            color: ${colors.secondary};
            font-size: 1.5rem;
            border: none;
            cursor: pointer;
            background-color: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
                color: ${colors.background};
            }
            > svg {
                width: 100%;
                height: 100%;
            }
        }
    }
`;
