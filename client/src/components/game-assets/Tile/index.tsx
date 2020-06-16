import React from 'react';
import { DivTile } from './style';

interface TileProps {
  x: number;
  y: number;
  width: number;
  height: number;
  isInitial: boolean;
  debug: boolean;
}

const Tile: React.FC<TileProps> = ({ ...rest }) => {
  const { x, y, debug } = rest;

  const renderDebug = () => {
    return <span>{`${x}x${y}`}</span>;
  };

  // using style inline for performance reasons
  return (
    <DivTile
      {...rest}
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
