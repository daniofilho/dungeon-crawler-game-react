import React, { useCallback, useMemo } from 'react';

import { useActionsPopup } from 'engine/microHooks/useActionsPopup';
import { usePlayer } from 'engine/usePlayer';
import { useGame } from 'engine/useGame';
import { useScenario } from 'engine/useScenario';

import { Container, Adjacent } from './styles';

const Tile: React.FC<TileType> = (props) => {
  const { turn } = useGame();
  const { showActionMenu, hideActionMenu } = useActionsPopup();
  const { canWalk } = usePlayer();
  const { isStairLocked } = useScenario();

  const { adjacent, id } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      //only open popup on acions turn
      if (turn !== 'actions') return hideActionMenu();

      // only activate menu on adjacents tiles
      if (!adjacent) return hideActionMenu();

      return showActionMenu({
        x: e.pageX,
        y: e.pageY,
        tile: props,
        triggeredBy: 'tile',
        triggeredBy_ElementID: id,
      });
    },
    [adjacent, hideActionMenu, id, props, turn, showActionMenu]
  );

  const type = useMemo((): TileTypeType => {
    if (props.type !== 'stair') return props.type;

    // If it's a stair, define correct image
    return isStairLocked ? 'stair-closed' : 'stair';
  }, [isStairLocked, props.type]);

  return (
    <Container
      {...props}
      type={type}
      adjacent={adjacent && canWalk}
      onClick={(e) => handleClick(e)}
    >
      {/*<p>{id}</p>*/}
      {adjacent && canWalk && <Adjacent {...props} />}
    </Container>
  );
};

export default React.memo(Tile);
