import { EquationIdentifierWrapper } from "./Equation.style";

const EquationIdentifier = ({identifier = '', withPoint = true}) => {
  return (<EquationIdentifierWrapper>
    {identifier}{withPoint ? '.' : ''}
  </EquationIdentifierWrapper>);
}

export default EquationIdentifier;
