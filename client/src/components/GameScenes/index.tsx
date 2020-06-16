import React, { useContext } from 'react';

import { GameContext } from 'engine/GameProvider';

import { ContextType } from 'types';

import { DivGameScene } from './style';

const GameScenes: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const { renderItems } = context.state;

  return (
    <DivGameScene>
      {renderItems.map((item, index: number) => {
        return <div key={index}>{item}</div>;
      })}
    </DivGameScene>
  );
};

export default GameScenes;
