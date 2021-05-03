import styled from 'styled-components';
import { transparentize } from 'polished';

import colors from 'styles/common/colors';

export const Container = styled.div`
  position: fixed;
  z-index: 50;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;

  section {
    background-color: ${transparentize(0.05, colors.purple)};
    width: 80vw;
    height: 80vh;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > footer {
      grid-area: footer;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    h1,
    p {
      text-align: center;
      margin-bottom: 2rem;
    }
    h1 {
      color: ${colors.lightBlue};
      font-size: 1.5rem;
    }
    p {
      color: #fff;
      line-height: 2rem;
    }
  }

  footer {
    button {
      margin: 0 1rem;
    }
  }
`;

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

// # Draft

export const Draft = styled.div`
  grid-area: left;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    li {
      padding: 2rem;

      button {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
      }
    }
  }
`;

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

// # Store

export const Store = styled.div`
  grid-area: right;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    li {
      padding: 2rem;

      button {
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
      }
    }
  }
`;

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

// # Item

type ItemProps = {
  active: boolean;
};

export const Item = styled.li<ItemProps>`
  display: flex;
  flex-direction: column;

  opacity: ${({ active }) => (active ? 1 : 0.5)};

  span {
    text-align: center;
    font-size: 0.6rem;
    color: #fff;
    padding: 0.2rem;
  }

  img {
    width: 2rem;
    margin: 0 auto;
  }

  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    border-width: 0;
    padding: 0.2rem;
    background-color: ${colors.yellow};
    border-bottom: 0.1rem solid ${colors.red};
    border-radius: 0.2rem;
    margin-top: 1rem;

    img {
      width: 0.7rem;
      margin-right: 0.5rem;
    }

    span {
      color: #333;
    }
  }
`;
