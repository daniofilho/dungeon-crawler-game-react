import styled from 'styled-components';

export const Container = styled.div<ActionPopUpType>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: none;

  position: fixed;
  z-index: 30;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  transform: translate(-50%, -100%);
  margin-top: 1rem; //to compensate arrow size

  width: 16rem;
  height: 8rem;

  display: flex;
  align-items: flex-end;

  button {
    pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  }

  ul {
    width: 100%;
    li {
      &:last-of-type {
        width: 100%;
        height: 1.25rem;
        display: block;
        text-align: center;
        svg {
          margin: 0 auto;
        }
      }
    }
  }
`;

interface LiProps {
  enabled: boolean;
}
export const Li = styled.li<LiProps>`
  opacity: ${({ enabled }) => (enabled ? 1 : 0.5)};
  margin-bottom: 0.3rem;
  filter: grayscale(${({ enabled }) => (enabled ? 0 : 100)}%);

  button {
    background-color: rgba(0, 0, 0, 0.9);
    border-width: 0;
    color: #fff;
    width: 100%;
    display: flex;
    align-items: center;

    img {
      margin-right: 0.6rem;
    }
  }
`;
