import React, { createContext, useContext, useCallback } from 'react';

import produce from 'immer';

import { useScenario } from 'engine/useScenario';
import { usePlayer } from 'engine/usePlayer';

import { useEnemies } from 'engine/microHooks/useEnemies';

import {
  getAdjacentTiles,
  getadjacentPosition,
  get2DMapTileIndexByTileId,
  isTileWalkable,
} from 'utils/tiles';
import { MAP2D_SIZE } from 'engine/constants';

const UseTileContext = createContext<UseTileContextData>({} as UseTileContextData);

const UseTileProvider: React.FC = ({ children }) => {
  const scenario = useScenario();
  const player = usePlayer();
  const enemies = useEnemies();

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # Hooks after enter on a tile

  // Objective
  const afterStepOnObjective = useCallback(
    (tile: TileType) => {
      // Update player objectives
      scenario.findAnObjective();

      // Change the tile type to a normal
      scenario.setActiveLevel_TileType({
        newTileType: 'floor',
        tileID: tile.id,
      });
    },
    [scenario]
  );

  // Trap
  const afterStepOnTrap = useCallback(() => {
    // hurt player
    player.hurtPlayer(1);
  }, [player]);

  // Stair
  const afterStepOnStair = useCallback(() => {
    if (scenario.isStairLocked) return;
    const nextLevelInitialTile = scenario.goToNextLevel();

    if (nextLevelInitialTile) player.updatePositionBasedOnTile(nextLevelInitialTile);
  }, [player, scenario]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # Hooks after new tiles discovered

  // Nest
  const afterDiscoverNest = useCallback(
    ({ tile }: afterDiscoverNestProps) => {
      return enemies.respawnAnEnemy({
        tileId: tile.id,
        x: tile.x,
        y: tile.y,
      });
    },
    [enemies]
  );

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Draw a tile from deck
  const drawTileFromDeck = useCallback((): TileTypeType => {
    const {
      currentLevel: { deck },
    } = scenario;

    // If some error occour and deck is empty, return an empty tile to avoid errors
    if (deck.length <= 0) return 'floor';

    const maxLenght = deck.length - 1;

    const randomIndex = Math.floor(Math.random() * maxLenght) + 0;

    const tile: TileTypeType = deck[randomIndex];

    // Remove card from deck
    let hasRemoved = false;
    const newDeck = deck.filter((card) => {
      if (!hasRemoved && card === tile) {
        hasRemoved = true;
        return;
      }
      return card;
    });

    // Save data
    scenario.setActiveLevel_Deck(newDeck);

    // Return the tile
    return tile;
  }, [scenario]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # ACTIONS

  // # Walk
  const walkToTile = useCallback(
    (tile: TileType) => {
      const tileID = tile.id;

      // Security checks
      if (!player.canWalk) return;
      if (!tile.discovered) return;
      if (player.getItem('boots').quantity <= 0) return;

      // declarations
      const adjacentTiles = getAdjacentTiles(tileID);

      const adjacentTilesArray = [
        adjacentTiles.up,
        adjacentTiles.down,
        adjacentTiles.left,
        adjacentTiles.right,
      ];

      let playerX: number | null = null;
      let playerY: number | null = null;

      // # create new tiles
      const newTiles = scenario.currentLevel.tiles.map((t) => {
        return produce(t, (draftTile) => {
          // # Define active
          if (draftTile.id === tileID) {
            draftTile.active = true;

            // Define new player props
            playerX = draftTile.x;
            playerY = draftTile.y;
          } else {
            // can only have one tile active, so make others inactive
            draftTile.active = false;
          }

          // # Define adjacents props if the tile is listed as adjancet
          if (adjacentTilesArray.includes(draftTile.id)) {
            draftTile.adjacent = true;
            draftTile.adjacentPosition = getadjacentPosition(draftTile.id, adjacentTiles);
          } else {
            draftTile.adjacent = false;
          }

          return draftTile;
        });
      });

      // update
      scenario.setActiveLevel_Tiles(newTiles);

      // # Player Movement

      // remove a boot from player items
      player.subItemQuantity({
        itemId: 'boots',
        quantity: 1,
      });

      // update player position
      if (playerX && playerY) {
        player.setPosition({
          tile,
          coordinates: {
            x: playerX,
            y: playerY,
          },
        });
      }

      // Trigger actions after step on some tiles
      if (tile.type === 'objective') afterStepOnObjective(tile);
      if (tile.type === 'trap') afterStepOnTrap();
      if (tile.type === 'stair') afterStepOnStair();
    },
    [afterStepOnObjective, afterStepOnStair, afterStepOnTrap, player, scenario]
  );

  const discovertTileOn2DMap = useCallback(
    (tile: TileType, originTile: TileType) => {
      // # Find position of origin tile on reference map
      const originPosition = get2DMapTileIndexByTileId(
        originTile.id,
        scenario.currentLevel.map2DReference
      );

      // # Get Coordinates of new Tile
      const newPosition = [...originPosition];

      if (tile.adjacentPosition === 'left') {
        const x = newPosition[1] - 1;
        if (x < 0) return; // avoid out of map
        newPosition[1] = x;
      }

      if (tile.adjacentPosition === 'right') {
        const x = newPosition[1] + 1;
        if (x > MAP2D_SIZE) return; // avoid out of map
        newPosition[1] = x;
      }

      if (tile.adjacentPosition === 'up') {
        const y = newPosition[0] - 1;
        if (y < 0) return; // avoid out of map
        newPosition[0] = y;
      }

      if (tile.adjacentPosition === 'down') {
        const y = newPosition[0] + 1;
        if (y > MAP2D_SIZE) return; // avoid out of map
        newPosition[0] = y;
      }

      // # Now change 2D Maps
      scenario.updateCurrentMap2D(newPosition[0], newPosition[1], tile.id, tile.walkable);
    },
    [scenario]
  );

  const discoverTile = useCallback(
    (tile: TileType, originTile: TileType) => {
      const tileID = tile.id;

      let tileDiscovered: TileType | null = null;
      let tileDiscoveredType = '';

      // Security Checks
      if (tile.discovered) return;
      if (!player.canDiscover) return;
      if (player.getItem('eye').quantity <= 0) return;

      const newTiles = scenario.currentLevel.tiles.map((tile) => {
        // # Define discovered
        if (tile.id === tileID) {
          // if it's not discovered, draw the new tile type
          if (!tile.discovered) {
            const newTileType = drawTileFromDeck();

            tileDiscoveredType = newTileType;
            tileDiscovered = tile;

            return produce(tile, (draftTile) => {
              draftTile.discovered = true;
              draftTile.type = newTileType;
              draftTile.walkable = isTileWalkable(newTileType);

              discovertTileOn2DMap(draftTile, originTile);

              return draftTile;
            });
          }
        }

        return tile;
      });
      scenario.setActiveLevel_Tiles(newTiles);

      // Trigger actions after some tiles types are discovered
      if (tileDiscovered && tileDiscoveredType === 'nest')
        afterDiscoverNest({ tile: tileDiscovered });

      // remove a player eye item
      player.subItemQuantity({
        itemId: 'eye',
        quantity: 1,
      });
    },
    [afterDiscoverNest, discovertTileOn2DMap, drawTileFromDeck, player, scenario]
  );

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  return (
    <UseTileContext.Provider value={{ drawTileFromDeck, walkToTile, discoverTile }}>
      {children}
    </UseTileContext.Provider>
  );
};

const useTile = (): UseTileContextData => {
  const context = useContext(UseTileContext);
  if (!context) throw new Error('useUseTile must be used within an UseTileProvider');
  return context;
};

export { UseTileProvider, useTile };
