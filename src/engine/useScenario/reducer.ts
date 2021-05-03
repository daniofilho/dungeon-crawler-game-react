import produce from 'immer';
import { findIndex } from 'lodash';

const actions = {
  setScenario: (
    state: UseScenarioReducerStateType,
    params: UseScenarioReducerStateType
  ): UseScenarioReducerStateType => {
    state = params;
    return state;
  },
  setActiveLevel: (
    state: UseScenarioReducerStateType,
    params: number
  ): UseScenarioReducerStateType => {
    state.activeLevel = params;
    return state;
  },
  setActiveLevel_Deck: (
    state: UseScenarioReducerStateType,
    params: LevelDeckType
  ): UseScenarioReducerStateType => {
    state.levels[state.activeLevel].deck = params;
    return state;
  },
  setActiveLevel_Tiles: (
    state: UseScenarioReducerStateType,
    params: Array<TileType>
  ): UseScenarioReducerStateType => {
    state.levels[state.activeLevel].tiles = params;
    return state;
  },
  setActiveLevel_Enemies: (
    state: UseScenarioReducerStateType,
    params: Array<IEnemyInstance>
  ): UseScenarioReducerStateType => {
    state.levels[state.activeLevel].enemies = params;
    return state;
  },
  setActiveLevel_Map2DWalkable: (
    state: UseScenarioReducerStateType,
    params: Map2DWalkableType
  ): UseScenarioReducerStateType => {
    state.levels[state.activeLevel].map2DWalkable = params;
    return state;
  },
  setActiveLevel_Map2DReference: (
    state: UseScenarioReducerStateType,
    params: Map2DReferenceType
  ): UseScenarioReducerStateType => {
    state.levels[state.activeLevel].map2DReference = params;
    return state;
  },
  setActiveLevel_ObjectivesFound: (
    state: UseScenarioReducerStateType,
    params: number
  ): UseScenarioReducerStateType => {
    state.levels[state.activeLevel].objectives.found = params;
    return state;
  },
  setActiveLevel_TileType: (
    state: UseScenarioReducerStateType,
    params: setActiveLevel_TileTypeProps
  ): UseScenarioReducerStateType => {
    const index = findIndex(state.levels[state.activeLevel].tiles, { id: params.tileID });
    if (index) state.levels[state.activeLevel].tiles[index].type = params.newTileType;

    return state;
  },
};

function reducer(
  state: UseScenarioReducerStateType,
  action: ReducerGenericActionsType
): UseScenarioReducerStateType {
  return produce(state, (draftState: UseScenarioReducerStateType) => {
    switch (action.function) {
      case 'setScenario':
        return actions.setScenario(draftState, action.params);
      case 'setActiveLevel':
        return actions.setActiveLevel(draftState, action.params);
      case 'setActiveLevel_Deck':
        return actions.setActiveLevel_Deck(draftState, action.params);
      case 'setActiveLevel_Tiles':
        return actions.setActiveLevel_Tiles(draftState, action.params);
      case 'setActiveLevel_Enemies':
        return actions.setActiveLevel_Enemies(draftState, action.params);
      case 'setActiveLevel_Map2DWalkable':
        return actions.setActiveLevel_Map2DWalkable(draftState, action.params);
      case 'setActiveLevel_Map2DReference':
        return actions.setActiveLevel_Map2DReference(draftState, action.params);
      case 'setActiveLevel_ObjectivesFound':
        return actions.setActiveLevel_ObjectivesFound(draftState, action.params);
      case 'setActiveLevel_TileType':
        return actions.setActiveLevel_TileType(draftState, action.params);

      default:
        return draftState;
    }
  });
}

export { actions, reducer };
