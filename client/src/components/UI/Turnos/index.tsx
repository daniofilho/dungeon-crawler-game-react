import React from 'react';

// Turnos
import RolagemDados from './RolagemDados';
import Acoes from './Acoes';
import Monstros from './Monstros';

import { DivTurnos } from './style';

const Turnos: React.FC = () => {
  return (
    <DivTurnos>
      <ul>
        <li className="first">Turno:</li>
        <li>
          <RolagemDados />
        </li>
        <li>
          <Acoes />
        </li>
        <li>
          <Monstros />
        </li>
      </ul>
    </DivTurnos>
  );
};

export default Turnos;
