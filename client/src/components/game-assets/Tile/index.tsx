import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import {
  TextureLoader,
  LoadingManager,
  NearestFilter,
  MeshBasicMaterial,
} from 'three';

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

  const [loaded, setLoaded] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const { x, y } = rest;

  // Texture
  const loadManager = new LoadingManager();
  const loader = new TextureLoader(loadManager);

  const textureSides = loader.load('images/sprites/tile-open.jpg');
  textureSides.magFilter = NearestFilter;

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (loaded) mesh.current.rotation.x += 0.001;
  });

  loadManager.onLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {loaded && (
        <mesh
          ref={mesh}
          position={[x, y, 0]}
          onClick={(e) => setActive(!active)}
        >
          <boxGeometry attach="geometry" args={[1, 1, 1]} />
          <meshBasicMaterial attach="material" map={textureSides} />
        </mesh>
      )}
    </>
  );
};

export default Tile;
