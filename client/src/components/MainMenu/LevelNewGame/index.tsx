import React, { useContext } from 'react';

import { GameContext } from 'engine/GameProvider';

import char01 from 'assets/sprites/char01-avatar.png';
import char02 from 'assets/sprites/char02-avatar.png';

import { DivLevelNewGame } from './style';

import { ContextType } from 'types';

const LevelNewGame: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const {
    logic: { setCharType, mainMenu },
  } = context;

  const doChoosePlayer = (type: string) => {
    setCharType(type);
    mainMenu('new');
  };

  return (
    <DivLevelNewGame className="level-new-game">
      <h4>Escolha seu Personagem</h4>
      <br />
      <ul className="menu">
        <li className="menu-new">
          <a
            href="#!"
            className="menu-item"
            onClick={() => {
              doChoosePlayer('char01');
            }}
          >
            <img src={char01} id="char01" alt="char01" />
          </a>
        </li>
        <li className="menu-new">
          <a
            href="#!"
            className="menu-item"
            onClick={() => {
              doChoosePlayer('char02');
            }}
          >
            <img src={char02} id="char02" alt="char02" />
          </a>
        </li>
      </ul>
    </DivLevelNewGame>
  );
};

export default LevelNewGame;
