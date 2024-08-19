import styled from "styled-components";
import colors from "@/Presentation/colors.ts";

export const BarWrapper = styled.div<{$progressionPercentage?: number, $color: string}>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
    > div {
        transition: width 0.3s ease;
        width: ${({$progressionPercentage}) => $progressionPercentage ?? 0}%;
        height: 100%;
        background-color: ${({$color}) => $color};
    }
`;

export type componentProps = {
  progressionPercentage?: number,
};

export default ({progressionPercentage = 0}: componentProps) => {
  return (<BarWrapper $progressionPercentage={progressionPercentage} $color={colors.category1}><div></div></BarWrapper>);
};
