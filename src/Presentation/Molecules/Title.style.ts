import styled from 'styled-components';
import colors from '@/Presentation/colors.ts';

export default styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    padding: 2%;
    >h1 {
        font-size: 2.5em;
        margin: 0;
        color: ${colors.main};
    };
`;
