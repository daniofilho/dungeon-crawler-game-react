import React from 'react';

import Tile from '../components/game-assets/Tile';

class GlobalAssets {

  constructor(gameProps) { 
    this.gameProps = gameProps;
  }

  getAsset = ( type, props, fromSaveState ) => {
    let r;
    switch( type ) {
      default:
      case 'tile':
        r = <Tile componentProps={props} gameProps={this.gameProps} />
        break;
    }
    return r;
  }

}//class
export { GlobalAssets }