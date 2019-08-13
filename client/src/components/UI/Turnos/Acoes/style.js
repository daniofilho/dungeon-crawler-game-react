import styled from 'styled-components';

export const DivAcoes = styled.div`
  
  opacity: 0.4;
  &.acoes { opacity: 1; }

  &.acoes .content { display: block; }
  .content {
    display: none;
    position: fixed;
    right: 10px;
    top: 10px;
  }
  
`;