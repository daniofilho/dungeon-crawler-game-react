import produce from 'immer';

const actions = {
  setGame: (
    state: UseGameReducerStateType,
    params: UseGameReducerStateType
  ): UseGameReducerStateType => {
    state = params;
    return state;
  },
  setGameOver: (state: UseGameReducerStateType, params: boolean): UseGameReducerStateType => {
    state.gameOver = params;
    return state;
  },
  setGameWon: (state: UseGameReducerStateType, params: boolean): UseGameReducerStateType => {
    state.gameWon = params;
    return state;
  },
  setTurn: (state: UseGameReducerStateType, params: TurnType): UseGameReducerStateType => {
    state.turn = params;
    return state;
  },
  setRound: (state: UseGameReducerStateType, params: number): UseGameReducerStateType => {
    state.round = params;
    return state;
  },
};

function reducer(
  state: UseGameReducerStateType,
  action: ReducerGenericActionsType
): UseGameReducerStateType {
  return produce(state, (draftState: UseGameReducerStateType) => {
    switch (action.function) {
      case 'setGame':
        return actions.setGame(draftState, action.params);
      case 'setGameOver':
        return actions.setGameOver(draftState, action.params);
      case 'setGameWon':
        return actions.setGameWon(draftState, action.params);
      case 'setTurn':
        return actions.setTurn(draftState, action.params);
      case 'setRound':
        return actions.setRound(draftState, action.params);

      default:
        return draftState;
    }
  });
}

export { actions, reducer };
