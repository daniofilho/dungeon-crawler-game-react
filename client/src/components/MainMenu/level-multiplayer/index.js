import React, { Component } from "react";
import { GameContext } from "../../../engine/GameProvider";
import { DivLevelMultiplayer } from "./style";
import Button from "../../Button";
import Input from "../../Input";

//import char01 from '../../../assets/sprites/char01-avatar.png';
//import char02 from '../../../assets/sprites/char02-avatar.png';

export default class LevelMultiplayer extends Component {
  render() {
    const context = this.context;
    return (
      <DivLevelMultiplayer className="level-multiplayer">
        <p>
          Nome de usuário
          <br />
          <Input
            type="text"
            value={context.state.username}
            onChange={e => {
              context.logic.setUsername(e.target.value);
            }}
          />
        </p>

        <ul className="menu">
          <li className="menu-new">
            <Button
              theme={"blue"}
              onClick={() => {
                context.logic.createHost();
              }}
              label={"Criar Sala"}
            />
          </li>
          <li className="menu-new">
            <Button
              theme={"blue"}
              onClick={() => {
                context.logic.joinHost("menu");
              }}
              label={"Entrar em sala existente"}
            />
          </li>
        </ul>

        <div className="menu create-host">
          <p>
            Código da Sala: <input type="readonly" defaultValue="XXXX" />
          </p>

          <ul className="menu">
            <li className="menu-new">
              <Button
                theme={"blue"}
                onClick={() => {
                  context.logic.createHost();
                }}
                label={"Iniciar Jogo"}
              />
            </li>
          </ul>
        </div>

        <div className="menu join-host">
          <p>
            Digite o código da Sala: <input type="text" defaultValue="" />
          </p>

          <ul className="menu">
            <li className="menu-new">
              <Button
                theme={"blue"}
                onClick={() => {
                  context.logic.joinHost("init");
                }}
                label={"Entrar na sala"}
              />
            </li>
          </ul>
        </div>
      </DivLevelMultiplayer>
    );
  }
}

LevelMultiplayer.contextType = GameContext;
