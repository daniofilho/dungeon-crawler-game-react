import React, { Component } from 'react';
import { DivTurnos } from './style';
import { GameContext } from '../../../engine/GameProvider';

// Turnos
import RolagemDados from './RolagemDados';
import Acoes from './Acoes';
import Monstros from './Monstros';

export default class Turnos extends Component {
  
  render() {
    const props = this.context.state;
    return (
      <DivTurnos className={props.TurnosClassName}>

        <ul>
          <li className="first">Turno:</li>
          <li><RolagemDados /></li>
          <li><Acoes /></li>
          <li><Monstros /></li>
        </ul>

      </DivTurnos>
    );
  }
}
Turnos.contextType = GameContext;
