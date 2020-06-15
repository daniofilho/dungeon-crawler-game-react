import React from 'react';

import Tile from 'components/game-assets/Tile';

class GlobalAssets {
  constructor(gameState, gameVars) {
    this.gameState = gameState;
    this.gameVars = gameVars;
  }

  getAsset = (type, props, fromSaveState) => {
    let r;
    switch (type) {
      default:
      case 'tile':
        r = (
          <Tile
            componentProps={props}
            gameState={this.gameState}
            gameVars={this.gameVars}
          />
        );
        break;
    }
    return r;
  };
} //class
export { GlobalAssets };
