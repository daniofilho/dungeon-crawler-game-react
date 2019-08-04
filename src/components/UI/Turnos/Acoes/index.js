import React, { Component } from 'react';
import { DivAcoes } from './style';
import { GameContext } from '../../../../engine/GameProvider';

export default class Acoes extends Component {
  
  render() {
    const props = this.context.state;
    const logic = this.context.logic;
    return (
      <DivAcoes className={props.turn}>
        
        <label>Ações</label>

        <div className="content">
            <a href="#!" onClick={ () => { logic.acoesEncerrar() }}>
              Encerrar<br/>
              Turno
            </a>
        </div>

      </DivAcoes>
    );
  }
}
Acoes.contextType = GameContext;