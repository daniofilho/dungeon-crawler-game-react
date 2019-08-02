import React from 'react';

import Tile from '../components/game-assets/Tile'

class GlobalAssets {

  constructor() { }

  getAsset = ( type, props, fromSaveState ) => {
    let r;
    switch( type ) {
      default:
      case 'tile':
        r = <Tile props={props} />
        break;
    }
    return r;
  }

}//class
export { GlobalAssets }