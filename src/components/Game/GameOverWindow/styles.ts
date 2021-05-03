import styled from 'styled-components';

export const Container = styled.article`
  backdrop-filter: blur(10px);

  position: fixed;
  z-index: 50;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(50, 0, 0, 0.8);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #fff;

  h1 {
    font-size: 3.75rem;
    margin-bottom: 1.25rem;
    text-transform: uppercase;
  }

  p {
    margin: 1rem 0;
  }

  button {
    margin-top: 2rem;
  }
`;
