import styled from "styled-components";

export default styled.div<{$progressionPercentage: number, $color: string}>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  > div {
      width: ${({$progressionPercentage}) => $progressionPercentage}%;
      height: 100%;
      background-color: ${({$color}) => $color};
  }
`;