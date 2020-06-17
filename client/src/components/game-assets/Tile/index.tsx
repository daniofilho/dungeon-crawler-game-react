import React, { useContext } from 'react';

import { GameContext } from 'engine/GameProvider';

import { DivTile } from './style';

import { ContextType } from 'types';

interface TileProps {
  x?: number;
  y?: number;
  isInitial?: boolean;
}

const Tile: React.FC<TileProps> = ({ ...rest }) => {
  const context = useContext<ContextType>(GameContext);

  const { x, y } = rest;

  const debug: boolean = context.state.debug.active;

  const tileSize = context.vars.tileSize;

  const renderDebug = () => {
    return <span>{`${x}x${y}`}</span>;
  };

  // using style inline for performance reasons
  return (
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
  );
};

export default Tile;
