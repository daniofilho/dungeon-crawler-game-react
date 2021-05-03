import produce from 'immer';
import { findKey } from 'lodash';

import { GamePlayer_Initial } from '../../game-definitions/initial_state';

const actions = {
  setPlayer: (
    state: UsePlayerReducerStateType,
    params: UsePlayerReducerStateType
  ): UsePlayerReducerStateType => {
    state = params;
    return state;
  },
  updatePlayerAfterAttack: (
    state: UsePlayerReducerStateType,
    params: UpdatePlayerAfterAttackProps
  ): UsePlayerReducerStateType => {
    state.attributes.experience = params.experience;
    state.attributes.experienceToNextLevel = params.experienceToNextLevel;
    state.attributes.pointsToSpend = params.pointsToSpend;
    state.attributes.level = params.level;

    return state;
  },
  setPosition: (
    state: UsePlayerReducerStateType,
    params: PlayerPositionType
  ): UsePlayerReducerStateType => {
    state.position = params;
    return state;
  },
  setAttributes: (
    state: UsePlayerReducerStateType,
    params: PlayerAttributesType
  ): UsePlayerReducerStateType => {
    state.attributes = params;
    return state;
  },
  setAttribute: (
    state: UsePlayerReducerStateType,
    params: PlayerAttributeParam
  ): UsePlayerReducerStateType => {
    state.attributes[params.attribute] = params.value;
    return state;
  },
  setItems: (
    state: UsePlayerReducerStateType,
    params: Array<InventoryItemType>
  ): UsePlayerReducerStateType => {
    state.items = params;
    return state;
  },
  setItem: (
    state: UsePlayerReducerStateType,
    params: PlayerItemParam
  ): UsePlayerReducerStateType => {
    const index = findKey(state.items, { id: params.itemId });
    if (index) state.items[Number(index)] = params.itemProps;

    return state;
  },
  addItemQuantity: (
    state: UsePlayerReducerStateType,
    params: PlayerItemQuantityParam
  ): UsePlayerReducerStateType => {
    const index = findKey(state.items, { id: params.itemId });
    if (index) state.items[Number(index)].quantity += params.quantity;

    return state;
  },
  subItemQuantity: (
    state: UsePlayerReducerStateType,
    params: PlayerItemQuantityParam
  ): UsePlayerReducerStateType => {
    const index = findKey(state.items, { id: params.itemId });
    if (index) state.items[Number(index)].quantity -= params.quantity;

    return state;
  },
  setCoins: (state: UsePlayerReducerStateType, params: number): UsePlayerReducerStateType => {
    state.coins = params;
    return state;
  },
  addCoins: (state: UsePlayerReducerStateType, params: number): UsePlayerReducerStateType => {
    state.coins = state.coins + params;
    return state;
  },
  subCoins: (state: UsePlayerReducerStateType, params: number): UsePlayerReducerStateType => {
    state.coins = state.coins - params;
    return state;
  },
};

function reducer(
  state: UsePlayerReducerStateType,
  action: ReducerGenericActionsType
): UsePlayerReducerStateType {
  return produce(state, (draftState: UsePlayerReducerStateType) => {
    switch (action.function) {
      case 'setPlayer':
        return actions.setPlayer(draftState, action.params);
      case 'setPosition':
        return actions.setPosition(draftState, action.params);
      case 'setItems':
        return actions.setItems(draftState, action.params);
      case 'setItem':
        return actions.setItem(draftState, action.params);
      case 'addItemQuantity':
        return actions.addItemQuantity(draftState, action.params);
      case 'subItemQuantity':
        return actions.subItemQuantity(draftState, action.params);
      case 'setAttributes':
        return actions.setAttributes(draftState, action.params);
      case 'setAttribute':
        return actions.setAttribute(draftState, action.params);
      case 'setCoins':
        return actions.setCoins(draftState, action.params);
      case 'addCoins':
        return actions.addCoins(draftState, action.params);
      case 'subCoins':
        return actions.subCoins(draftState, action.params);
      case 'updatePlayerAfterAttack':
        return actions.updatePlayerAfterAttack(draftState, action.params);

      case 'clear':
        return GamePlayer_Initial;

      default:
        return draftState;
    }
  });
}

export { actions, reducer };
