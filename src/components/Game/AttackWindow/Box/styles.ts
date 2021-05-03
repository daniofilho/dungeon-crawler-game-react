import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    width: 3.1rem;
    height: 3.1rem;
    margin: 0.3rem auto;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    li {
      text-align: center;
    }
  }
`;
