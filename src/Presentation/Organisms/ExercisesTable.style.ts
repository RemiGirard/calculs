import styled from 'styled-components';

import colors from '@/Presentation/colors.ts';

export default styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    >div {
        background-color: ${colors.secondary};
        &:nth-child(odd) {
            background-color: ${colors.main};
        }
    }
`;
