import React, { useContext } from 'react';

import { GameContext } from 'engine/GameProvider';

import Dice from './Dice';
import Turnos from './Turnos';

import { DivUI } from './style';

import { ContextType, DiceType } from 'types';

const UI: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const {
    state: { charProps, UIClassName },
  } = context;
  const { dices } = charProps;

  return (
    <DivUI className={UIClassName}>
      <ul className="dices">
        {dices.map((dice: DiceType, index: number) => {
          return (
            <li key={index}>
              <Dice number={dice.value} />
            </li>
          );
        })}
      </ul>
      <Turnos />
    </DivUI>
  );
};

export default UI;
