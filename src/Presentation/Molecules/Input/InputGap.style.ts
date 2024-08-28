import styled from "styled-components";
import unselectable from "@/Presentation/css/unselectable.ts";

export default styled.div`
  ${unselectable}
  > div {
      width: 28%;
      text-align: center;
      white-space: break-spaces;
      > span {
          font-weight: bold;
      }
      &:nth-child(3) {
          width: 44%;
      }
  }
`;