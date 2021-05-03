import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
  useEffect,
} from 'react';

import { findKey } from 'lodash';
import produce from 'immer';

import { playerConfig, gameConfig } from 'game-definitions/config';

import { useGame } from 'engine/useGame';

import { GamePlayer_Initial } from '../../game-definitions/initial_state';

import * as PlayerReducer from './reducer';
import mapReducerActions from 'lib/mapReducerActions';

const storageKey = 'player';

const UsePlayerContext = createContext<UsePlayerContextData>({} as UsePlayerContextData);

const UsePlayerProvider: React.FC = ({ children }) => {
  const game = useGame();

  // # Stores
  const storeData = useMemo(() => {
    const store = localStorage.getItem(storageKey);
    if (store) JSON.parse(store);
    return null;
  }, []);

  // # Reducer
  const initialData: PlayerType = storeData || GamePlayer_Initial;
  const [state, dispatch] = useReducer(PlayerReducer.reducer, {
    ...initialData,
  });
  const actions: UsePlayerActionsType = useMemo(
    () => mapReducerActions(PlayerReducer.actions, dispatch),
    []
  );
  const reducer: UsePlayerReducerType = useMemo(() => ({ state, actions }), [actions, state]);

  // # When state changes, update store
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(reducer.state));
  }, [storeData, reducer.state]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  const clear = useCallback(() => {
    actions.setPlayer(GamePlayer_Initial);
    localStorage.removeItem(storageKey);
  }, [actions]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Constants

  const player = reducer.state;

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # Flags

  // Detect if player can discover new tiles / walk
  const canDiscover = useMemo(() => {
    const index = findKey(player.items, { id: 'eye' });
    if (index) {
      if (player.items[Number(index)].quantity > 0) return true;
    }
    return false;
  }, [player.items]);

  // Detect if player can walk
  const canWalk = useMemo(() => {
    const index = findKey(player.items, { id: 'boots' });
    if (index) {
      if (player.items[Number(index)].quantity > 0) return true;
    }
    return false;
  }, [player.items]);

  // Detect if player can drink potions
  const canDrinkPotions = useMemo(() => {
    const index = findKey(player.items, { id: 'potion' });
    if (index) {
      if (player.items[Number(index)].quantity > 0) return true;
    }
    return false;
  }, [player.items]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # Level

  const getPlayerExperienceToNextLevel = useCallback(() => {
    return Math.pow((player.attributes.level + 1) * playerConfig.experienceDificultyMultiplier, 2);
  }, [player.attributes.level]);

  const updatePositionBasedOnTile = useCallback(
    (tile: TileType) => {
      actions.setPosition({
        coordinates: {
          x: tile.x,
          y: tile.y,
        },
        tile,
      });
    },
    [actions]
  );

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # Items

  const getItem = useCallback(
    (id: ItemIDType): InventoryItemType => {
      const index = findKey(player.items, { id });
      return player.items[Number(index)];
    },
    [player.items]
  );

  const buyItem = useCallback(
    (item: ItemType): void => {
      if (player.coins < item.price) return;

      // update coins
      actions.setCoins(player.coins - item.price);

      // update item quantity
      const newItem = { ...getItem(item.id) };
      newItem.quantity += 1;

      actions.setItem({
        itemId: item.id,
        itemProps: newItem,
      });
    },
    [actions, getItem, player.coins]
  );

  const resetPlayerItems = useCallback(() => {
    actions.setItems(GamePlayer_Initial.items);
  }, [actions]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  const handlePlayerDied = useCallback(() => {
    game.setGameOver(true);
  }, [game]);

  // Hurt the player

  const hurtPlayer = useCallback(
    (amount: number) => {
      const newLife = player.attributes.life - amount;

      actions.setAttribute({
        attribute: 'life',
        value: newLife,
      });

      if (newLife <= 0) handlePlayerDied();
    },
    [actions, handlePlayerDied, player.attributes.life]
  );

  // Drink a potion to heal
  const drinkPotion = useCallback(() => {
    if (getItem('potion').quantity <= 0) return;

    // Add life
    let newLife = player.attributes.life + gameConfig.potionHealsLife;
    if (newLife > player.attributes.maxLife) newLife = player.attributes.maxLife;

    actions.setAttribute({
      attribute: 'life',
      value: newLife,
    });

    // Use the potion
    actions.subItemQuantity({
      itemId: 'potion',
      quantity: 1,
    });
  }, [actions, getItem, player.attributes.life, player.attributes.maxLife]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // # Attributes

  const upgradePlayerAttribute = useCallback(
    (attribute: PlayerAttributeStrings, newValue: number) => {
      if (player.attributes.pointsToSpend < 1) return;

      const attributes: PlayerAttributesType = produce(player.attributes, (draftAttributes) => {
        draftAttributes = {
          ...draftAttributes,
          [attribute]: newValue,
          pointsToSpend: draftAttributes.pointsToSpend - 1,
        };

        if (attribute === 'maxLife') {
          draftAttributes.life += 1;
        }

        return draftAttributes;
      });

      actions.setAttributes(attributes);
    },
    [player.attributes, actions]
  );

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  return (
    <UsePlayerContext.Provider
      value={{
        ...reducer.state,
        ...reducer.actions,

        clear,

        canDiscover,
        canWalk,
        canDrinkPotions,

        getPlayerExperienceToNextLevel,

        hurtPlayer,
        drinkPotion,

        resetPlayerItems,
        getItem,
        buyItem,

        upgradePlayerAttribute,

        updatePositionBasedOnTile,
      }}
    >
      {children}
    </UsePlayerContext.Provider>
  );
};

const usePlayer = (): UsePlayerContextData => {
  const context = useContext(UsePlayerContext);
  if (!context) throw new Error('usePlayer must be used within an UsePlayerProvider');
  return context;
};

export { UsePlayerProvider, usePlayer };
