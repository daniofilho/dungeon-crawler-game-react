import React, { useContext } from 'react';
import { GameContext } from 'engine/GameProvider';
import { DivMainMenu } from './style';

import Loading from 'components/Loading';
import Button from 'components/Button';

import LevelNewGame from './LevelNewGame';
import LevelMultiplayer from './LevelMultiplayer';

import { ContextType } from 'types';

const MainMenu: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const {
    state: { fistScreenDisplay, mainMenuClass },
    logic: { start, mainMenu },
  } = context;

  const firstScreenStyle = {
    display: fistScreenDisplay,
  };

  return (
    <DivMainMenu>
      <div id="first-screen" style={firstScreenStyle}>
        <ul className="menu">
          <li>
            <Button type="button" theme="blue" onClick={() => start()}>
              Iniciar Jogo
            </Button>
          </li>
        </ul>
      </div>

      <div id="mainMenu" className={mainMenuClass}>
        <ul className="menu level-menu">
          <li>
            <Button
              theme="blue"
              onClick={() => {
                mainMenu('menu-new');
              }}
            >
              Novo Jogo
            </Button>
          </li>
          <li>
            <Button
              theme="blue"
              onClick={() => {
                mainMenu('multiplayer');
              }}
            >
              Multijogador
            </Button>
          </li>
          <li>
            <Button
              theme="blue"
              onClick={() => {
                mainMenu('load');
              }}
            >
              Carregar Jogo
            </Button>
          </li>
          <li>
            <Button
              theme="blue"
              onClick={() => {
                mainMenu('instructions');
              }}
            >
              Instruções
            </Button>
          </li>
          <li>
            <Button
              theme="blue"
              onClick={() => {
                mainMenu('credits');
              }}
            >
              Créditos
            </Button>
          </li>
        </ul>

        <LevelNewGame />

        <LevelMultiplayer />
      </div>

      <Loading />
    </DivMainMenu>
  );
};

export default MainMenu;
