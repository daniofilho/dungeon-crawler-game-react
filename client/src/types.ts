interface DiceType {
  value: number;
  isUsed: boolean;
}

export interface ContextType {
  state: {
    /* Debug */
    debug: {
      active: boolean;
      autoLoad: boolean;
    };

    /* multiplayer */
    username: string;
    hostCode: string;
    hostConnectedUsers: Array<string>;

    /* mainMenu */
    fistScreenDisplay: string;
    mainMenuClass: string;

    /* states */
    isLoading: boolean;

    /* Character */
    character: boolean;
    charProps: {
      lifes: number;
      type: string;
      x: number;
      y: number;
      diceQty: number;
      dices: Array<DiceType>;
    };

    /* UI */
    UIClassName: string;

    /* Turns */
    turn: string;
    playerTurn: false;

    /* Dices */
    rollsLeft: number;

    /* Render */
    renderItems: Array<Object>;
  };
  logic: {
    /* common */
    getAsset: Array<Object>;

    /* sets */
    setUsername: Function;
    setHostCode: Function;
    setCharType: Function;

    /* menu */
    start: Function;
    mainMenu: Function;

    /* server */
    createHost: Function;
    joinHost: Function;
    startMultiplayerGame: Function;

    /* dices */
    rollDices: Function;

    /* turns */
    finishRollDiceTurn: Function;
    finishActionTurn: Function;
    finishMonstersTurn: Function;
  };
}
