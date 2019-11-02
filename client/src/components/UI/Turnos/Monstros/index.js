import React, { Component } from 'react';
import { DivMonstros } from './style';
import { GameContext } from '../../../../engine/GameProvider';
import Button from '../../../Button';

export default class Monstros extends Component {
  
  render() {
    const props = this.context.state;
    const logic = this.context.logic;
    return (
      <DivMonstros className={props.turn}>
        
        <label>Monstros</label>

        <div className="content">
          <Button theme={'blue'} onClick={ () => { logic.finishMonstersTurn() }} label={(<span>Encerrar<br/>Turno</span>)} />
        </div>

      </DivMonstros>
    );
  }
}
Monstros.contextType = GameContext;