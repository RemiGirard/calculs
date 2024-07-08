import styled from 'styled-components';

import colors from '@/Presentation/colors.ts';

export default styled.div`
    width: 100%;
    display: flex;
    > div {
        width: 100%;
        >div {
            background-color: ${colors.mainAlternate};
            &:nth-child(odd) {
                background-color: ${colors.main};
            }
        }
    }
`;
