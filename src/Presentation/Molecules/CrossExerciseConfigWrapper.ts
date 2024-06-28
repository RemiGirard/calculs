import styled from 'styled-components';

export default styled.div`
  position: relative;
  > div {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 2em;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }
`;
