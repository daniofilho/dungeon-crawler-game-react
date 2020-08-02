import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Scenario from './Scenario';

import {
  ContextType,
  GameStateType,
  CharacterProps,
  GameVarsType,
  InitalTilePropsType,
} from 'types';

import { _vars, _state } from './config';

// The Typescript Partial allows the context to initialize with an empty object.
// The data will later initialize fully through the context Provider.
const GameContext = React.createContext({} as ContextType);

const GameProvider: React.FC = ({ children }) => {
  // # Socket.io
  let socket: any = {};

  // # Variables that don't need to be on state
  const vars: GameVarsType = _vars;

  // # State
  const [state, setState] = useState<GameStateType>(_state);

  // Function to help updating only necessary states
  const updateState = (newState: Object, callback: Function = () => {}) => {
    setState((oldState: GameStateType) => {
      return {
        ...oldState,
        ...newState,
      };
    });
    callback();
  };

  /* - - - - - - */

  // # Functions

  /* loading */
  const loading = (bool: boolean) => {
    updateState({ isLoading: bool });
  };

  /* Event Listeners */

  // Update Var variable with actual turn, so EventListeners can access
  useEffect(() => {
    vars.canDrag = state.turn === 'acoes';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleKeyUp = (keyCode: number) => {
    if (keyCode === 32)
      if (vars.scenario && vars.scenario.centerScreen)
        // 32 = space
        vars.scenario.centerScreen();
  };

  // Update screen scroll position
  const updateScreenScroll = () => {
    if (vars.mouseDown && vars.canDrag) {
      document.body.style.cursor = 'grabbing';
      let scrollX = vars.mouseX - vars.mouseX0;
      let scrollY = vars.mouseY - vars.mouseY0;

      //let x = vars.pageX - scrollX;
      //let y = vars.pageY - scrollY;

      let x = state.camera.position.x - scrollX;
      let y = state.camera.position.y - scrollY;

      //window.scrollTo(x, y);
      updateCameraPosition({ x, y });
    } else {
      document.body.style.cursor = 'default';
    }
  };

  // Allow to move the screen with mouse click
  const draggableCanvas = () => {
    window.addEventListener('mousedown', (e) => {
      vars.mouseDown = true;
      vars.mouseX0 = e.x;
      vars.mouseY0 = e.y;
      vars.pageX = window.scrollX;
      vars.pageY = window.scrollY;
    });

    window.addEventListener('mouseup', () => {
      vars.mouseDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      vars.mouseX = e.x;
      vars.mouseY = e.y;
      updateScreenScroll();
    });

    window.addEventListener('resize', () => {
      if (vars.scenario && vars.scenario.centerScreen)
        vars.scenario.centerScreen();
    });
  };

  // All event listeners
  const defaultEventListeners = () => {
    // # Keyboard Events
    window.addEventListener(
      'keyup',
      function (e: KeyboardEvent) {
        handleKeyUp(e.keyCode);
      },
      false,
    );

    draggableCanvas();
  };

  /* - - - - - - */

  /* Roll Dices */
  const getADiceRoll = (keepIndexes: Array<number> = []) => {
    let aux: Array<object> = [];

    // Generate a new dice roll
    new Array(state.charProps.dicesInitialQty)
      .fill('')
      .forEach((_, index: number) => {
        // Will need to keep th value of this Dice?
        if (keepIndexes && keepIndexes.includes(index)) {
          // keep
          aux.push(state.charProps.dices[index]);
        } else {
          // gen a new one
          aux.push({
            value: Math.floor(Math.random() * 6) + 1,
            isUsed: false,
          });
        }
      });

    return aux;
  };

  const rollDices = (keepIndex: Array<number>) => {
    if (state.rollsLeft > 0) {
      updateState({
        charProps: {
          ...state.charProps,
          dices: getADiceRoll(keepIndex),
        },
        rollsLeft: state.rollsLeft - 1,
      });
    }
  };

  const finishRollDiceTurn = (callback: Function) => {
    updateState(
      {
        turn: 'acoes',
        UIClassName: 'acoes',
      },
      () => {
        if (callback) callback();
      },
    );
  };

  /* - - - - - - */

  /* New Game */

  const startNewGame = (saveData: boolean, multiplayer: boolean) => {
    // # Init
    defaultEventListeners();

    // # Scenario
    let scenario = new Scenario(state, vars);
    vars.scenario = scenario;

    let initialTileProps: Partial<InitalTilePropsType> = scenario.getInitialStateProps();

    // # Render Items
    let renderItems = scenario.getRenderItems();

    // # Char
    let charProps: Partial<CharacterProps> = {};
    charProps.x = initialTileProps.centerX;
    charProps.y = initialTileProps.centerY;

    // # Set States and finish
    updateState(
      {
        charProps: {
          ...state.charProps,
          x: charProps.x,
          y: charProps.y,
          dices: getADiceRoll(),
        },
        initialTileProps: initialTileProps,
      },
      () => {
        let character = {
          type: 'character',
          charType: state.charProps.type,
          saveData: saveData,
          x: charProps.x,
          y: charProps.y,
        };

        // Add it to Render
        renderItems.push(character);

        updateState(
          {
            renderItems: renderItems,
            character: character,
            UIClassName: 'rolar-dados',
            turn: 'acoes', //'rolar-dados', @TODO
          },
          () => {
            // Finished
            if (vars.scenario.centerScreen) vars.scenario.centerScreen();
            loading(false);
          },
        );
      },
    );
  };

  const startMultiplayerGame = () => {
    updateState({ mainMenuClass: '' });
    loading(true);
    setTimeout(() => {
      startNewGame(false, true);
    }, 500);
  };

  /* - - - - - - */

  /* Main Menu */
  const mainMenu = (action: string) => {
    switch (action) {
      case 'menu-new':
        updateState({ mainMenuClass: 'show new' });
        break;
      case 'multiplayer':
        updateState({ mainMenuClass: 'show multiplayer' });
        break;
      case 'new':
        updateState({ mainMenuClass: '' });
        loading(true);
        setTimeout(() => {
          startNewGame(false, false);
        }, 500);
        break;
      default:
        alert('Em desenvolvimento');
        break;
    }
  };

  /* Start Game */
  const start = () => {
    updateState(
      {
        fistScreenDisplay: 'none',
        mainMenuClass: 'show',
      },
      () => {
        if (state.debug.autoLoad) mainMenu('new');
      },
    );
  };

  /* auto load */
  useEffect(() => {
    if (state.debug.autoLoad) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* - - - - - - */

  /* Sets */
  const setUsername = (username: string) => {
    updateState({
      username: username,
    });
  };
  const setHostCode = (code: string) => {
    updateState({
      hostCode: code,
    });
  };
  const setCharType = (type: string) => {
    updateState({
      charProps: {
        ...state.charProps,
        type: type,
      },
    });
  };

  /* - - - - - - */

  /* Actions */

  const finishActionTurn = () => {
    updateState({
      turn: 'monstros',
      UIClassName: 'monstros',
    });
  };

  /* - - - - - - */

  /* Monsters */

  const finishMonstersTurn = () => {
    updateState({
      charProps: {
        ...state.charProps,
        dices: getADiceRoll(),
      },
      rollsLeft: 3,
      turn: 'rolar-dados',
      UIClassName: 'rolar-dados',
    });
  };

  /* - - - - - - */

  /* Camera */
  const updateCameraPosition = ({
    x = state.camera.position.x,
    y = state.camera.position.y,
    z = state.camera.position.z,
  }) => {
    updateState({
      camera: {
        ...state.camera,
        position: {
          x,
          y,
          z,
        },
      },
    });
  };

  /* - - - - - - */

  /* Server */

  const conn = () => {
    socket = io('http://localhost:3333', {
      query: { username: state.username },
    });

    //Eventos recebidos pelo socket
    socket.on('host-created', (hostCode: string) => {
      updateState({ hostCode: hostCode });
    });
    socket.on('host-users-updated', (users: Array<string>) => {
      updateState({ hostConnectedUsers: users });
    });
    socket.on('join-host-finished', (headers: any) => {
      if (headers.operationSucceded) {
        updateState({ hostCode: headers.hostCode });
      } else {
        alert(headers.message);
      }
    });
  };

  const createHost = () => {
    if (state.username !== null) {
      conn();
      socket.emit('create-host', {
        username: state.username,
      });
    } else {
      alert('Digite o nome de usuário antes.');
    }
  };

  const joinHost = (hostCode: string) => {
    conn();
    socket.emit('join-host', {
      username: state.username,
      hostCode: hostCode,
    });
  };

  /* - - - - - - */

  const logic = {
    /* sets */
    setUsername: setUsername,
    setHostCode: setHostCode,
    setCharType: setCharType,

    /* menu */
    start: start,
    mainMenu: mainMenu,

    /* server */
    createHost: createHost,
    joinHost: joinHost,
    startMultiplayerGame: startMultiplayerGame,

    /* dices */
    rollDices: rollDices,

    /* turns */
    finishRollDiceTurn: finishRollDiceTurn,
    finishActionTurn: finishActionTurn,
    finishMonstersTurn: finishMonstersTurn,

    /* camera */
    updateCameraPosition: updateCameraPosition,
  };

  return (
    <GameContext.Provider value={{ state, logic, vars }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameProvider, GameContext };
