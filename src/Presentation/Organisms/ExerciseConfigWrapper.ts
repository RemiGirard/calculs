import styled from 'styled-components';

export default styled.div`
  width: 100%;
  display: flex;
  > div {
      &:nth-child(1) {
          width: 50%;
      }
      &:nth-child(2) {
          width: 50%;
      }
      &:nth-child(3) {
          width: 50%;
      }
  }
`;
