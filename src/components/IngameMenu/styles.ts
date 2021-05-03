import styled from 'styled-components';

type ContainerProps = {
  isOpen: boolean;
};
export const Container = styled.div<ContainerProps>`
  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ul {
    li {
      width: 18.75rem;
      margin-bottom: 1.25rem;

      button {
        width: 100%;
      }
    }
  }
`;
