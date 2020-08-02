import React from 'react';

import { RenderItemType } from 'types';

import Tile from 'components/game-assets/Tile';
import Character from 'components/game-assets/Character';

export const getAsset = (props: RenderItemType) => {
  switch (props.type) {
    default:
    case 'tile':
      return <Tile {...props} />;
    //case 'character':
    //return <Character {...props} />;
  }
};
