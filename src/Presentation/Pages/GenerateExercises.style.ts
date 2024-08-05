import styled from 'styled-components';
import colors from '@/Presentation/colors.ts';

export default styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors.background};
    min-width: 1000px;
    min-height: 800px;
    > div:nth-child(1) {
        height: 10%;
    }
    > div:nth-child(2) {
        max-height: 80%;
    }
    > div:nth-child(3) {
        width: 98%;
        height: 8%;
        padding: 0.5% 1%;
    }
`;
