import React from 'react';

import { DivDice } from './style';

interface DiceType {
  number: number;
}

const Dice: React.FC<DiceType> = ({ ...rest }) => {
  return <DivDice {...rest}></DivDice>;
};

export default Dice;
