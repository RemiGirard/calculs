import styled from 'styled-components';
import colors from "@/Presentation/colors.ts";

export default styled.div`
  display: table-row;
    > div {
        display: table-cell;
        white-space: break-spaces;
        text-align: center;
        vertical-align:top;
        
        &.letter {
            position: relative;
            font-size: 0.5em;
            color: ${colors.main};
            top: 1em;
        }
        .moduloResult {
            font-size: 0.5em;
            text-align: left;
            > div {
                display: flex;
                flex-direction: row;
            }
        }
    }
`;