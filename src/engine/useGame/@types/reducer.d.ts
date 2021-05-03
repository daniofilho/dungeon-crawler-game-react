declare type UseGameDataStoreType = GameType;

declare type UseGameReducerStateType = GameType;

declare interface UseGameActionsType {
  setGame: (params: GameType) => void;
  setGameOver: (params: boolean) => void;
  setGameWon: (params: boolean) => void;
  setTurn: (params: TurnType) => void;
  setRound: (params: number) => void;
}

interface UseGameContextData extends GameType, UseGameActionsType {
  clear: () => void;
}

declare type UseGameReducerType = {
  state: UseGameReducerStateType;
  actions: UseGameActionsType;
};
