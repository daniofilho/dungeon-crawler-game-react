import React, { useContext, useRef } from 'react';
import { useFrame } from 'react-three-fiber';

import { GameContext } from 'engine/GameProvider';

import { DivTile } from './style';

import { ContextType } from 'types';
import { AnyARecord } from 'dns';

interface TileProps {
  x: number;
  y: number;
  isInitial: boolean;
}

const Tile: React.FC<TileProps> = ({ ...rest }) => {
  const mesh: any = useRef();

  const context = useContext<ContextType>(GameContext);

  //console.log(context);

  const { x, y } = rest;

  //const debug: boolean = context.state.debug.active;

  const tileSize = context.vars.tileSize;

  /*const renderDebug = () => {
    return <span>{`${x}x${y}`}</span>;
  };*/

  // Rotate mesh every frame, this is outside of React without overhead
  //useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  // using style inline for performance reasons
  return <></>;
  return (
    <mesh ref={mesh} scale={[1, 1, 1]} position={[x, y, 10]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={'orange'} />
    </mesh>
  );
  /*return (
    <DivTile
      {...rest}
      width={tileSize}
      height={tileSize}
      style={{
        left: x,
        top: y,
      }}
    >
      {debug && renderDebug()}
    </DivTile>
  );*/
};

export default Tile;
