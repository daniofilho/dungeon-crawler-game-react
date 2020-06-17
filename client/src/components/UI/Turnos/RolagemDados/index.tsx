import React, { useState, useContext } from 'react';

import { GameContext } from 'engine/GameProvider';

import Button from 'components/Button';
import Dice from 'components/UI/Dice';

import { DivRolagemDados } from './style';

import { ContextType, DiceType } from 'types';

const RolagemDados: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const {
    logic: { rollDices, finishRollDiceTurn },
    state: { charProps, rollsLeft, turn },
  } = context;
  const { dices } = charProps;

  // When reroll, what dices will keep? This value store this info
  const [dicesKept, setDicesKept] = useState<Array<number>>([]);

  const toggleDice = (index: number) => {
    setDicesKept((oldState) => {
      if (oldState.includes(index)) {
        return oldState.filter((e) => e !== index);
      }
      return [...oldState, index];
    });
  };

  const renderDices = () => {
    return (
      <ul className="dices">
        {dices.map((dice: DiceType, index: number) => {
          return (
            <li key={index}>
              <Dice number={dice.value} />
              <br />
              <input
                type="checkbox"
                name="keep-dice"
                value={dice.value}
                defaultChecked={dicesKept.includes(index)}
              />
              <label
                className={dicesKept.includes(index) + ''}
                onClick={() => {
                  toggleDice(index);
                }}
              >
                Manter
              </label>
            </li>
          );
        })}
      </ul>
    );
  };

  const labelRerollDice = () => {
    return (
      <span>
        Rerolar Dados! <br />
        <small>restam: {rollsLeft}</small>
      </span>
    );
  };

  const onEndDiceTurn = () => {
    // Reset checkbox status for a new dice roll
    setDicesKept([]);
  };

  return (
    <DivRolagemDados className={turn}>
      <label>Rolagem Dados</label>

      <div className="rolagem-dados">
        {renderDices()}

        <div className="button">
          <Button
            theme="red"
            onClick={() => {
              rollDices(dicesKept);
            }}
          >
            {labelRerollDice()}
          </Button>
          <br />
          <Button
            theme={'blue'}
            onClick={() => {
              finishRollDiceTurn(onEndDiceTurn());
            }}
          >
            Ficar com esses dados
          </Button>
        </div>
      </div>
    </DivRolagemDados>
  );
};

export default RolagemDados;
