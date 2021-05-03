import styled from 'styled-components';

import colors from 'styles/common/colors';

export const Container = styled.div`
  background-color: ${colors.purple};
  padding: 1.25rem;
  padding-top: 2.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  h1 {
    color: #fff;
  }

  button {
    width: 18.7rem;
    margin-bottom: 1.25rem;
  }
`;

export const Panel = styled.div`
  max-width: 56.25rem;
  width: 80vw;
  height: 100%;
  margin: 1.25rem 0;
  padding: 2.5rem;

  flex: 1;
  overflow-y: auto;

  background: rgba(255, 255, 255, 0.2);

  ul {
    li {
      list-style: none;
      margin-bottom: 1.25rem;

      display: flex;
      align-items: center;

      label {
        text-align: right;
        padding-right: 0.9rem;
        flex: 1;
        font-size: 1.25rem;
        color: #fff;
      }
      div {
        flex: 1;
        padding-left: 0.9rem;
      }
    }
  }
`;
