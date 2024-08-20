import styled from 'styled-components';

export default styled.div`
  position: relative;
  > button {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 1.5em;
    display: flex;
    justify-content: center;
    cursor: pointer;
    // reset button style
    border: none;
    background: none;
    color: inherit;
    font-size: 1.5em;
    border-radius: 50em;
  }
`;
