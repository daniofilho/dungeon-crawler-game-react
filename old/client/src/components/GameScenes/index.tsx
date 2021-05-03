import React, { useContext } from 'react';

import { GameContext } from 'engine/GameProvider';

import { getAsset } from 'engine/GlobalAssets';

import { ContextType, RenderItemType } from 'types';

import { DivGameScene } from './style';

const GameScenes: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const { renderItems } = context.state;

  return (
    <DivGameScene>
      {renderItems.map((item: RenderItemType, index: number) => {
        return <div key={index}>{getAsset(item)}</div>;
      })}
    </DivGameScene>
  );
};

export default GameScenes;
