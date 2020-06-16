import React from 'react';

import Tile from 'components/game-assets/Tile';

class GlobalAssets {
  constructor(gameState, gameVars) {
    this.gameState = gameState;
    this.gameVars = gameVars;
  }

  getAsset = (type, componentProps, fromSaveState = false) => {
    let r;
    switch (type) {
      default:
      case 'tile':
        r = (
          <Tile
            x={componentProps.x}
            y={componentProps.y}
            isInitial={componentProps.isInitial}
            width={this.gameVars.tileSize}
            height={this.gameVars.tileSize}
            debug={this.gameState.debug.active}
          />
        );
        break;
    }
    return r;
  };
} //class
export { GlobalAssets };
