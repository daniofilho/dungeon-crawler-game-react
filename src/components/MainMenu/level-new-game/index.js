import React, { Component } from 'react';
import { GameContext } from '../../../engine/GameProvider';
import { DivLevelNewGame } from './style';

import char01 from '../../../assets/sprites/char01-avatar.png';
import char02 from '../../../assets/sprites/char02-avatar.png';

export default class LevelNewGame extends Component {

  render() {
		return (
			<DivLevelNewGame className="level-new-game">
				<GameContext.Consumer>
					{(context) => (
            <React.Fragment>
              <h4>Escolha seu Personagem</h4><br/>
              <ul className="menu">
                <li className="menu-new">
                  <a href="#!" className="menu-item" onClick={ () => { context.logic.mainMenu('new', 'char01') } }> 
                    <img src={char01} id="char01" alt="char01" />
                  </a>
                </li>
                <li className="menu-new">
                  <a href="#!" className="menu-item" onClick={ () => { context.logic.mainMenu('new', 'char02') } }> 
                    <img src={char02} id="char02" alt="char02" />
                  </a>
                </li>
              </ul>
            </React.Fragment>
          )}
        </GameContext.Consumer>
      </DivLevelNewGame>
    )
  }

}