import React, { useCallback } from 'react';

import { useScenario } from 'engine/useScenario';
import { useActionsPopup } from 'engine/microHooks/useActionsPopup';

import { Life } from 'components/Game/Life';

import { getTileByID } from 'utils/tiles';

import { Container } from './styles';

const Enemy: React.FC<IEnemyInstance> = ({ id, life, maxLife, position, ...rest }) => {
  const { showActionMenu } = useActionsPopup();
  const { currentLevel } = useScenario();

  // The click on the tile will discover it
  const handleClick = useCallback(
    (e: any): void => {
      // is current enemy tile adjacent?
      const tile = getTileByID(position.tileId, currentLevel.tiles);
      if (!tile) return;
      if (!tile.adjacent) return;

      return showActionMenu({
        x: e.pageX,
        y: e.pageY,
        triggeredBy: 'enemy',
        triggeredBy_ElementID: id,
      });
    },
    [currentLevel.tiles, id, position.tileId, showActionMenu]
  );

  return (
    <>
      <Life value={life} max={maxLife} x={position.x} y={position.y} />
      <Container
        id={id}
        life={life}
        maxLife={maxLife}
        position={position}
        {...rest}
        onClick={(e) => handleClick(e)}
      />
    </>
  );
};

export default Enemy;
