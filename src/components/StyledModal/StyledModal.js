import styled from 'styled-components';

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  opacity: 0.8;
  background-color: rgb(150, 143, 143);    
`;

export default StyledModal;