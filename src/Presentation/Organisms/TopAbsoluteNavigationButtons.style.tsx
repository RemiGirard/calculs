import styled from "styled-components";
import colors from "@/Presentation/colors.ts";

export default styled.div`
  width: 96%;
  position: absolute;
  top: 0;
  padding: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > button {
      min-height: 100px;
      height: 20%;
      min-width: 100px;
      width: 20%;
      border: none;
      color: ${colors.mainText};
      background-color: ${colors.secondary};
      opacity: 0.8;
      &:hover {
          background-color: ${colors.mainHighlight};
      }
  }
`;