import styled from 'styled-components';

import colors from 'styles/common/colors';

export const Container = styled.div`
  background-color: ${colors.purple};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  & > div {
    max-width: 80vw;
    margin: 0 auto;
  }

  h1 {
    color: ${colors.lightGreen};
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p,
  strong {
    color: #fff;
    font-size: 0.8rem;
    line-height: 1rem;
    margin-bottom: 1rem;
  }

  ul {
    li {
      button {
        width: 18.7rem;
        margin-bottom: 1.25rem;
      }
    }
  }
`;
