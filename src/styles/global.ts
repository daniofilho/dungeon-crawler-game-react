import { createGlobalStyle } from 'styled-components';

import sweetalert2 from './components/sweetalert2';

export default createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font: 400 1rem 'Press Start 2P', sans-serif;
  }
 
  html, body, #app {
    width: 100%;
    height: 100%;
  }

  #app {
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
  }

  img {
    image-rendering: pixelated;
  }

  button {
    cursor: pointer;
  }

  a,
  a:hover {
    text-decoration: none;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .text-center {
    text-align: center;
  }

  .player-color {
    color: #0000FF;
  }

  .enemy-color {
    color: #FFFF00;
  }

  .text-green {
    color: #00FF00;
  }
  .text-red {
    color: #FF0000;
  }

  /* Components */
  ${sweetalert2}
`;
