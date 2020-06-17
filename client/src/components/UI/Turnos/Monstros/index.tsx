import React, { useContext } from 'react';

import { GameContext } from 'engine/GameProvider';

import Button from 'components/Button';

import { DivMonstros } from './style';

import { ContextType } from 'types';

const Monstros: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const {
    logic: { finishMonstersTurn = () => {} },
    state: { turn },
  } = context;

  return (
    <DivMonstros className={turn}>
      <label>Monstros</label>

      <div className="content">
        <Button
          theme="blue"
          onClick={() => {
            finishMonstersTurn();
          }}
        >
          <span>
            Encerrar
            <br />
            Turno
          </span>
        </Button>
      </div>
    </DivMonstros>
  );
};

export default Monstros;
