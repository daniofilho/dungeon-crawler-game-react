import React, { useContext } from 'react';

import { GameContext } from 'engine/GameProvider';

import { DivChar } from './styles';

import { CharacterProps, ContextType } from 'types';

const char01_avatar = 'images/char01-avatar.png';
const char02_avatar = 'images/char02-avatar.png';

const Character: React.FC<CharacterProps> = ({ ...rest }) => {
  const context = useContext<ContextType>(GameContext);

  // Set character image
  const defineCharImage = (type: string) => {
    switch (type) {
      default:
      case 'char01':
        return char01_avatar;
      case 'char02':
        return char02_avatar;
    }
  };

  const { charType = 'char01' } = rest;
  const charImage = defineCharImage(charType);

  const tileSize = context.vars.tileSize;

  return (
    <DivChar
      x={rest.x || 0}
      y={rest.y || 0}
      tileSize={tileSize}
      image={charImage}
    />
  );
};

export default Character;
