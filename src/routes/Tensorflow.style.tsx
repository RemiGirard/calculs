import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ImageContainer = styled.div<{hidden?: boolean}>`
  flex-direction: column;
  display: ${props => props.hidden ? 'hidden' : 'flex'};
  align-items: center;
`
