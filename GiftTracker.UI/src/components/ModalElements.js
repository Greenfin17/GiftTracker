import styled from 'styled-components';

const GTModal = styled.div`
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.4);
  opacity:  ${({ isOpen }) => (isOpen ? '100%' : '0')};
  z-index:  ${({ isOpen }) => (isOpen ? 999 : -1)};
  transition: 0.2s ease-in-out;
`;

const GTModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border-radius: 4px;
  min-width: 300px;
  max-width: 450px;
`;

export {
  GTModal,
  GTModalContent
};
