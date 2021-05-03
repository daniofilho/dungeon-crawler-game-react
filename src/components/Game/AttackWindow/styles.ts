import styled, { css } from 'styled-components';

import { fade, shake } from 'styles/common/animations';

type ContainerProps = {
  processingAttack: boolean;
};

export const Container = styled.article<ContainerProps>`
  backdrop-filter: blur(10px);

  animation: ${fade} 1s forwards;

  ${({ processingAttack }) =>
    processingAttack &&
    css`
      animation: ${shake} 0.5s forwards;
    `}

  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #fff;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  margin-bottom: 1.8rem;
  & > section {
    padding: 1.25rem;
    text-align: center;
    img {
      width: 12.5rem;
      height: 12.5rem;
      display: block;
    }
    p {
      margin-top: 0.9em;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        font-size: 1.5rem;
        margin-right: 0.3rem;
      }
    }
  }
  /*divider*/
  & > div {
    background-color: #fff;
    height: 100%;
    width: 1px;
  }
`;

export const Content = styled.section`
  & > ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.6rem 0;
    li {
      width: 6.25rem;
      text-align: center;
    }
  }

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 1.5rem;
      margin-right: 0.3rem;
    }
  }

  nav {
    margin-top: 2.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.25rem;
  }
`;
