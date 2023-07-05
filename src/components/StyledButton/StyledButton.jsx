import styled from 'styled-components';

const StyledButton = styled.div`
  background-color: ${props => props.$highlight};
  color: black;
  font-size: 3em;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

export default StyledButton;
