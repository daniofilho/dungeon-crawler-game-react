import React, { useEffect, useLayoutEffect, useState } from 'react';

import gsap from 'gsap';
// eslint-disable-next-line import/no-named-as-default
import Draggable from 'gsap/Draggable';

import { useScenario } from 'engine/useScenario';
import { usePlayer } from 'engine/usePlayer';
import { useActionsPopup } from 'engine/microHooks/useActionsPopup';

import Player from 'components/Game/Player';
import Enemy from 'components/Game/Enemy';
import Tile from 'components/Game/Tile';
import Loading from 'components/Loading';

import { Container } from './styles';

const Map: React.FC = () => {
  gsap.registerPlugin(Draggable);

  const player = usePlayer();

  const { currentLevel } = useScenario();
  const { hideActionMenu } = useActionsPopup();

  const [loading, setLoading] = useState(true);

  const tiles = currentLevel.tiles;
  const enemies = currentLevel.enemies;

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  useLayoutEffect(() => {
    Draggable.create('#map', {
      type: 'scroll',

      dragClickables: true,
      throwProps: true,
      minimumMovement: 20,

      duration: { min: 0.1, max: 0.5 },
      onDragStart: () => {
        //console.log('..');
        hideActionMenu();
      },
    });
  }, [hideActionMenu]); // Start drag and update

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Remove loading after some time
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [setLoading]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  return (
    <Container id="map">
      <Loading show={loading} />

      <Player {...player} />

      {tiles &&
        tiles.map((tile: TileType | null) => {
          if (tile) return <Tile key={tile.id} {...tile} />;
          return <></>;
        })}

      {enemies &&
        enemies.map((enemy: IEnemyInstance) => {
          if (enemy) return <Enemy key={enemy.id} {...enemy} />;
          return <></>;
        })}
    </Container>
  );
};

export default Map;
