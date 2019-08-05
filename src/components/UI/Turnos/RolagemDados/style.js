import styled from 'styled-components';

export const DivRolagemDados = styled.div`

  opacity: 0.4;
  &.rolar-dados { opacity: 1; }

  &.rolar-dados .rolagem-dados { display: block; }
  .rolagem-dados {
    display: none;
    width: 80vw;
    height: 80vh;
    background: rgba(0,0,0,0.8);
    position: fixed;
    top: 10vh;
    left: 10vw;
    border: 5px solid #163D5C;

    .dices {
      width: 100%;
      padding: 100px 20px;
      li {
        text-align: center;
        position: relative;
        & > div {
          margin: 0 auto;
          transform: scale(3);
          transform-origin: center bottom;
        }

        input[type='checkbox'] { display: none; }
        
        label {
          display: block;
          cursor: pointer;
          font-size: 12px;
          text-decoration: none;
          padding: 5px 15px;
          display: block;
          border-radius: 0px;
          line-height: 20px; 
          color: #FFFFFF;
          background-color: #1F6096;
          border: 5px solid #163D5C;
          text-shadow: 2px 2px #000;
          box-shadow: 1px 1px 1px 0px #000; 
          opacity:0.5;      
        }

        input[type='checkbox']:checked + label {
          opacity: 1;
        }

      }
    }

    .button {
      width: 100%;
      position: relative;
      bottom: 0;
      text-align: center;
      padding: 40px;
    }

  }  



`;