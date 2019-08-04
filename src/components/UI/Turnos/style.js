import styled from 'styled-components';

export const DivTurnos = styled.div`

  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  
  ul {
    display: flex;  
    justify-content: center;
    align-items: center;
    li { 
      list-style: none;
      flex: 1; 
      text-align: center;
    }
    .first {
      flex: 0.5;
    }
  }
  
`;