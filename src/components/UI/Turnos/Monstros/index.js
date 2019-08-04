import React, { Component } from 'react';
import { DivMonstros } from './style';
import { GameContext } from '../../../../engine/GameProvider';

export default class Monstros extends Component {
  
  render() {
    const props = this.context.state;
    const logic = this.context.logic;
    return (
      <DivMonstros className={props.turn}>
        
        <label>Monstros</label>

        <div className="content">
            <a href="#!" onClick={ () => { logic.monstrosEncerrar() }}>
              Encerrar<br/>
              Turno
            </a>
        </div>

      </DivMonstros>
    );
  }
}
Monstros.contextType = GameContext;
