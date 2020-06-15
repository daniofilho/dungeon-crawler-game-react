import React, { Component } from 'react';
import { DivAcoes } from './style';
import { GameContext } from '../../../../engine/GameProvider';
import Button from '../../../Button';

export default class Acoes extends Component {
  render() {
    const props = this.context.state;
    const logic = this.context.logic;
    return (
      <DivAcoes className={props.turn}>
        <label>Ações</label>

        <div className="content">
          <Button
            theme="blue"
            onClick={() => {
              logic.finishActionTurn();
            }}
          >
            <span>
              Encerrar
              <br />
              Turno
            </span>
          </Button>
        </div>
      </DivAcoes>
    );
  }
}
Acoes.contextType = GameContext;
