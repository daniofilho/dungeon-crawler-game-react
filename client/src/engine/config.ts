import { GameVarsType, GameStateType } from 'types';

export const _vars: GameVarsType = {
  /* Config */
  tileSize: 150, //px - resolution
  horizontalTiles: 20,
  verticalTiles: 20,

  /* screen vars */
  mouseX: 0,
  mouseY: 0,
  mouseX0: 0,
  mouseY0: 0,
  pageX: 0,
  pageY: 0,

  /* Scenario */
  scenario: {},
  initialTileProps: {
    x: 0,
    y: 0,
    centerX: 0,
    centerY: 0,
  },

  /* "states" */
  mouseDown: false,
  canDrag: false,
};

export const _state: GameStateType = {
  /* Debug */
  debug: {
    active: false,
    autoLoad: false,
  },

  /* multiplayer */
  username: '',
  hostCode: '',
  hostConnectedUsers: [],

  /* mainMenu */
  fistScreenDisplay: 'flex',
  mainMenuClass: '',

  /* states */
  isLoading: false,

  /* Character */
  character: false,
  charProps: {
    lifes: 0,
    type: '',
    x: 800,
    y: 800,
    dicesInitialQty: 6,
    dices: [
      { value: -1, isUsed: false },
      { value: -1, isUsed: false },
      { value: -1, isUsed: false },
      { value: -1, isUsed: false },
      { value: -1, isUsed: false },
      { value: -1, isUsed: false },
    ],
  },

  /* UI */
  UIClassName: 'hide',

  /* Turns */
  turn: '',
  playerTurn: false,

  /* Dices */
  rollsLeft: 3222,

  /* Render */
  renderItems: [],
};
