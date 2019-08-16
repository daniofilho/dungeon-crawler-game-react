import React, { Component } from "react";
import { GameContext } from "../../../engine/GameProvider";
import { DivLevelNewGame } from "./style";

import char01 from "../../../assets/sprites/char01-avatar.png";
import char02 from "../../../assets/sprites/char02-avatar.png";

export default class LevelNewGame extends Component {
  doChoosePlayer = type => {
    this.context.logic.setCharType(type);
    this.context.logic.mainMenu("new");
  };

  render() {
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
                this.doChoosePlayer("char01");
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
                this.doChoosePlayer("char02");
              }}
            >
              <img src={char02} id="char02" alt="char02" />
            </a>
          </li>
        </ul>
      </DivLevelNewGame>
    );
  }
}

LevelNewGame.contextType = GameContext;
