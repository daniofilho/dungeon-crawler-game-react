import React from 'react';

import Tile from '../components/game-assets/Tile'
import Character from '../components/game-assets/Character'

class GlobalAssets {

  constructor(gameProps) { 
    this.gameProps = gameProps;
  }

  getAsset = ( type, props, fromSaveState ) => {
    let r;
    switch( type ) {
      default:
      case 'tile':
        r = <Tile props={props} gameProps={this.gameProps} />
        break;
      case 'char':
        r = <Character props={props} gameProps={this.gameProps} />
        break;
    }
    return r;
  }

}//class
export { GlobalAssets }