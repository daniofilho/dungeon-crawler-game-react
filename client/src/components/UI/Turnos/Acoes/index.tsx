import React, { useContext } from 'react';

import { GameContext } from 'engine/GameProvider';
import Button from 'components/Button';

import { DivAcoes } from './style';

import { ContextType } from 'types';

const Acoes: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const {
    logic: { finishActionTurn = () => {} },
    state: { turn },
  } = context;

  return (
    <DivAcoes className={turn}>
      <label>Ações</label>

      <div className="content">
        <Button
          theme="blue"
          onClick={() => {
            finishActionTurn();
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
};

export default Acoes;
