import styled from 'styled-components';

export const DivMonstros = styled.div`
  
  opacity: 0.4;
  &.monstros { opacity: 1; }

  &.monstros .content { display: block; }
  &.monstros label {
    font-size: 30px;
  }
  .content { display: none; }

  .content {
    position: fixed;
    right: 10px;
    top: 10px;
    a {
      font-size: 14px;
      color:#FFF;
      text-decoration: none;
      background: #1F6096;
      border: 5px solid #163D5C;
      box-shadow: 1px 1px 1px 3px #000;
      padding: 5px 15px;
      display: block;
      border-radius: 0px;
      text-shadow: 2px 2px #000;
      line-height: 20px;
    }
  }
  
`;