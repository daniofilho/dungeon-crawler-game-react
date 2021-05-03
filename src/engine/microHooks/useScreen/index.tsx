import React, { createContext, useContext, useCallback, useEffect } from 'react';

import { usePlayer } from 'engine/usePlayer';

import { tilesConfig } from 'game-definitions/config';

const UseScreenContext = createContext<UseScreenContextData>({} as UseScreenContextData);

const UseScreenProvider: React.FC = ({ children }) => {
  const player = usePlayer();

  const centerScreenOnTile = useCallback((tileX: number, tileY: number) => {
    // Center screen on center tile
    const mapDiv = document.getElementById('map');
    if (!mapDiv) return;

    // Get the XY central of a chunk
    const halfWidth = tilesConfig.size.width / 2;
    const halfHeight = tilesConfig.size.height / 2;

    // Width sizes
    const halfWindowWidth = Math.floor(document.documentElement.clientWidth / 2);
    const halfWindowHeight = Math.floor(document.documentElement.clientHeight / 2);

    // How many tiles fit on screen?
    const tilesOnX = Math.floor(document.documentElement.clientWidth / tilesConfig.size.width);
    const tilesOnY = Math.floor(document.documentElement.clientHeight / tilesConfig.size.height);

    // Get coordinates of the tile on center of screen
    const centerOfScreenX = Math.floor(tilesOnX / 2);
    const centerOfScreenY = Math.floor(tilesOnY / 2);

    let scrollToX = tileX - centerOfScreenX;
    let scrollToY = tileY - centerOfScreenY;

    scrollToX += halfWidth - halfWindowWidth;
    scrollToY += halfHeight - halfWindowHeight;

    mapDiv.scrollTo({
      left: scrollToX,
      top: scrollToY,
      behavior: 'smooth',
    });
  }, []);

  const centerScreenOnPlayer = useCallback(() => {
    const { x, y } = player.position.coordinates;
    centerScreenOnTile(x, y);
  }, [centerScreenOnTile, player.position.coordinates]);

  // Center screen on player when player coordinates change
  useEffect(() => {
    centerScreenOnPlayer();
  }, [centerScreenOnPlayer, player.position.coordinates]);

  return (
    <UseScreenContext.Provider value={{ centerScreenOnTile, centerScreenOnPlayer }}>
      {children}
    </UseScreenContext.Provider>
  );
};

const useScreen = (): UseScreenContextData => {
  const context = useContext(UseScreenContext);
  if (!context) throw new Error('useUseScreen must be used within an UseScreenProvider');
  return context;
};

export { UseScreenProvider, useScreen };
