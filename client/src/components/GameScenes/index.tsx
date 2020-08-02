import React, { useContext } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';

import { GameContext } from 'engine/GameProvider';

import { getAsset } from 'engine/GlobalAssets';

import { ContextType, RenderItemType } from 'types';

import { DivGameScene } from './style';

const GameScenes: React.FC = () => {
  const context = useContext<ContextType>(GameContext);

  const { renderItems, camera } = context.state;

  return (
    <DivGameScene>
      <Canvas
        camera={{
          fov: camera.fov,
          position: [camera.position.x, camera.position.y, camera.position.z],
        }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {renderItems.map((item: RenderItemType, index: number) => {
          return <React.Fragment key={index}>{getAsset(item)}</React.Fragment>;
        })}
      </Canvas>
    </DivGameScene>
  );
};

export default GameScenes;
