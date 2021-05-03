import styled from 'styled-components';

import colors from 'styles/common/colors';

export const Container = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0rem;
  width: 100%;

  ul {
    background-color: ${colors.lightGreen};

    display: flex;
    list-style: none;
    justify-content: space-around;
    margin-left: 6.25rem;

    li {
      opacity: 0.2;
      position: relative;
      text-align: center;
      color: ${colors.black};
      padding: 0.3rem 1rem;
      font-size: 0.8rem;
    }
    li.active {
      opacity: 1;

      &:after {
        background: ${colors.yellow};
      }
    }
  }

  ul:nth-of-type(1) {
    background-color: ${colors.lightBlue};
    li {
      opacity: 1;
    }
  }
`;
