import styled from 'styled-components';

export const DivLoading = styled.div`

  width: 100%;
  height: 100%;
  display: none;
  justify-content: flex-end;
  align-items: flex-end;
  top: 0;
  left: 0;
  background: black;
  position: fixed;
  z-index: 200;
  
  p {
    color: #FFF;
    font-size: 20px;
    padding: 20px 40px;
  }

  &.show { display: flex; }
  
`;