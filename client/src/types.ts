export interface RenderItemType {
  type: string;
  isInitial: boolean;
  debug?: boolean;
  saveData?: boolean;
  x: number;
  y: number;
  width?: number;
  height?: number;
  tileSize?: number;
  charType?: string;
}

export interface CharacterProps {
  charType?: string;
  x?: number;
  y?: number;
  tileSize?: number;
}

export interface DiceType {
  value: number;
  isUsed: boolean;
}

export interface InitalTilePropsType {
  x: number;
  y: number;
  centerX: number;
  centerY: number;
}

export interface ScenarioType {
  setupTiles?: Function;
  setInitialStateProps?: Function;
  getInitialStateProps?: Function;
  initSound?: Function;
  getScenarioSound?: Function;
  addRenderItem?: Function;
  getRenderItems?: Function;
  centerScreen?: Function;
  run?: Function;
}

export interface GameVarsType {
  /* Config */
  tileSize: number; //px - resolution
  horizontalTiles: number;
  verticalTiles: number;

  /* screen vars */
  mouseX: number;
  mouseY: number;
  mouseX0: number;
  mouseY0: number;
  pageX: number;
  pageY: number;

  /* Scenario */
  scenario: ScenarioType;
  initialTileProps: {
    x: number;
    y: number;
    centerX: number;
    centerY: number;
  };

  /* "states" */
  mouseDown: boolean;
  canDrag: boolean;
}

export interface GameStateType {
  /* Debug */
  debug: {
    active: boolean;
    autoLoad: boolean;
  };

  /* camera */
  camera: {
    fov: number;
    position: {
      x: number;
      y: number;
      z: number;
    };
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
    dicesInitialQty: number;
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
  renderItems: Array<RenderItemType>;
}

export interface GameLogicType {
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

  /* camera */
  updateCameraPosition: Function;
}

export interface ContextType {
  vars: GameVarsType;
  state: GameStateType;
  logic: Partial<GameLogicType>;
}
