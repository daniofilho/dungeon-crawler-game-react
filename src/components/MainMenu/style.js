import styled from 'styled-components';

export const DivMainMenu = styled.div`

  #first-screen {
    display: flex;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #mainMenu {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .level-new-game { display: none; }
  }
  #mainMenu.show { display: flex; }
  #mainMenu.new {
    .level-menu { display: none; }
    .level-new-game { display: block; }
  }

    .new-game .menu-save { display: none; }
    .new-game .menu-continue { display: none; }
    .paused .new-game .menu-continue { display: block ; }
    .paused .new-game .menu-save { display: block; }
    .paused  #controls,
    .paused  #mainMenu{ background: rgba(0,0,0, 0.5); }
    .paused #mainMenu .game-title { display: none; }

    #mainMenu .game-title {
      font-size: 40px;
      color: #FFF;
      width: 100%;
      margin-bottom: 20px;
      text-align: center;
      text-transform: uppercase;
    }

    .menu { 
      margin: 0;
      padding: 0;
    }
    .menu li { 
      width: 100%;
      text-align: center;
      list-style: none;
      padding: 5px;
    }
    .menu li a {
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

`;