import React, { useContext } from 'react';
import { Canvas } from 'react-three-fiber';

import { GameContext } from 'engine/GameProvider';

import { getAsset } from 'engine/GlobalAssets';

import { ContextType, RenderItemType } from 'types';

import { DivGameScene } from './style';

const GameScenes: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const { renderItems } = context.state;

  return (
    <DivGameScene>
      {/*<Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />


      </Canvas>*/}
      {renderItems.map((item: RenderItemType, index: number) => {
        return <div key={index}>{getAsset(item)}</div>;
      })}
    </DivGameScene>
  );
};

export default GameScenes;
