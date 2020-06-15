import React, { Component } from 'react';
import io from 'socket.io-client';
//import api from '../services/api';

import { Scenario } from './Scenario';
import { GlobalAssets } from './GlobalAssets';

import Character from 'components/game-assets/Character';

const GameContext = React.createContext();

class GameProvider extends Component {
  socket = false;

  /* constructor */

  vars = {
    /* Config */
    tileSize: 150, //px - resolution
    horizontalTiles: 20,
    verticalTiles: 20,

    /* screen vars */
    mouseX: 0,
    mouseY: 0,
    pageX: 0,
    pageY: 0,

    /* assets/components */
    globalAssets: false,

    /* Scenario */
    scenario: false,
    initialTileProps: {
      x: 0,
      y: 0,
      centerX: 0,
      centerY: 0,
    },

    /* "states" */
    mouseDown: false,
  };

  state = {
    /* Debug */
    debug: {
      active: false,
      autoLoad: false,
    },

    /* multiplayer */
    username: 'daniofilho',
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
      diceQty: 6,
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

  /* Functions */

  componentDidMount() {
    if (this.state.debug.autoLoad) this.start();
  }

  start = () => {
    this.vars.globalAssets = new GlobalAssets(this.state, this.vars);
    this.setState(
      {
        fistScreenDisplay: 'none',
        mainMenuClass: 'show',
      },
      () => {
        if (this.state.debug.autoLoad) this.mainMenu('new', 'char01');
      },
    );
  };

  /* loading */
  loading = (bool) => {
    this.setState({ isLoading: bool });
  };

  /* Main Menu */

  mainMenu = (action) => {
    switch (action) {
      case 'menu-new':
        this.setState({ mainMenuClass: 'show new' });
        break;
      case 'multiplayer':
        this.setState({ mainMenuClass: 'show multiplayer' });
        break;
      case 'new':
        this.setState({ mainMenuClass: '' });
        this.loading(true);
        setTimeout(() => {
          this.startNewGame(false, false);
        }, 500);
        break;
      default:
        alert('Em desenvolvimento');
        break;
    }
  };

  /* - - - - - - */

  /* Event Listeners */

  defaultEventListeners = () => {
    // # Keyboard Events
    window.addEventListener(
      'keyup',
      function (e) {
        this.handleKeyUp(e.keyCode);
      }.bind(this),
      false,
    );

    this.draggableCanvas();
  };

  handleKeyUp = (keyCode) => {
    // Dialog
    if (keyCode === 32)
      if (this.state.scenario)
        // Space
        this.state.scenario.centerScreen();
  };

  // Allow to move the screen with mouse click
  draggableCanvas = () => {
    window.addEventListener('mousedown', (e) => {
      this.vars.mouseDown = true;
      this.vars.mouseX0 = e.x;
      this.vars.mouseY0 = e.y;
      this.vars.pageX = window.scrollX;
      this.vars.pageY = window.scrollY;
    });

    window.addEventListener('mouseup', () => {
      this.vars.mouseDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      this.vars.mouseX = e.x;
      this.vars.mouseY = e.y;
      this.updateScreenScroll();
    });

    window.addEventListener('resize', () => {
      if (this.state.scenario) this.state.scenario.centerScreen();
    });
  };

  updateScreenScroll = () => {
    if (this.vars.mouseDown && this.state.turn === 'acoes') {
      document.body.style.cursor = 'grabbing';
      let scrollX = this.vars.mouseX - this.vars.mouseX0;
      let scrollY = this.vars.mouseY - this.vars.mouseY0;

      let x = this.vars.pageX - scrollX;
      let y = this.vars.pageY - scrollY;
      window.scrollTo(x, y);
    } else {
      document.body.style.cursor = 'default';
    }
  };

  /* - - - - - - */

  /* Sets */
  setUsername = (username) => {
    this.setState({
      username: username,
    });
  };
  setHostCode = (code) => {
    this.setState({
      hostCode: code,
    });
  };
  setCharType = (type) => {
    this.setState((prevState) => ({
      charProps: {
        ...prevState.charProps,
        type: type,
      },
    }));
  };

  /* - - - - - - */

  /* Roll Dices */

  getADiceRoll(keepIndex) {
    let dices = {};
    for (let index = 0; index < this.state.charProps.diceQty; index++) {
      if (keepIndex && keepIndex.includes(index)) {
        dices[index] = this.state.charProps.dices[index];
      } else {
        dices[index] = {
          value: Math.floor(Math.random() * 6) + 1,
          isUsed: false,
        };
      }
    }
    return dices;
  }

  rollDices = (keepIndex) => {
    if (this.state.rollsLeft > 0) {
      this.setState((prevState) => ({
        charProps: {
          ...prevState.charProps,
          dices: this.getADiceRoll(keepIndex),
        },
        rollsLeft: this.state.rollsLeft - 1,
      }));
    }
  };
  finishRollDiceTurn = (callback) => {
    this.setState(
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

  /* Actions */

  finishActionTurn = () => {
    this.setState({
      turn: 'monstros',
      UIClassName: 'monstros',
    });
  };

  /* - - - - - - */

  /* Monsters */

  finishMonstersTurn = () => {
    this.setState((prevState) => ({
      charProps: {
        ...prevState.charProps,
        dices: this.getADiceRoll(),
      },
      rollsLeft: 3,
      turn: 'rolar-dados',
      UIClassName: 'rolar-dados',
    }));
  };

  /* - - - - - - */

  /* Server */

  conn = () => {
    this.socket = io('http://localhost:3333', {
      query: { username: this.state.username },
    });

    //Eventos recebidos pelo socket
    this.socket.on('host-created', (hostCode) => {
      this.setState({ hostCode: hostCode });
    });
    this.socket.on('host-users-updated', (users) => {
      this.setState({ hostConnectedUsers: users });
    });
    this.socket.on('join-host-finished', (headers) => {
      if (headers.operationSucceded) {
        this.setState({ hostCode: headers.hostCode });
      } else {
        alert(headers.message);
      }
    });
  };

  createHost = () => {
    if (this.state.username !== null) {
      this.conn();
      this.socket.emit('create-host', {
        username: this.state.username,
      });
    } else {
      alert('Digite o nome de usuário antes.');
    }
  };

  joinHost = (hostCode) => {
    this.conn();
    this.socket.emit('join-host', {
      username: this.state.username,
      hostCode: hostCode,
    });
  };

  /* - - - - - - */

  /* New Game */

  startMultiplayerGame = () => {
    this.setState({ mainMenuClass: '' });
    this.loading(true);
    setTimeout(() => {
      this.startNewGame(false, true);
    }, 500);
  };

  startNewGame = (saveData, multiplayer) => {
    // # Init
    this.defaultEventListeners();

    // # Scenario
    let scenario = new Scenario(this.state, this.vars);
    let initialTileProps = scenario.getInitialStateProps();

    // # Render Items
    let renderItems = scenario.getRenderItems();

    // # Char
    let charProps = {};
    charProps.x = initialTileProps.centerX;
    charProps.y = initialTileProps.centerY;

    // # Set States and finish
    this.setState(
      (prevState) => ({
        charProps: {
          ...prevState.charProps,
          x: charProps.x,
          y: charProps.y,
          dices: this.getADiceRoll(),
        },
        scenario: scenario,
        initialTileProps: initialTileProps,
      }),
      () => {
        let character = (
          <Character
            charType={this.state.charProps.type}
            saveData={saveData}
            gameState={this.state}
            gameVars={this.vars}
          />
        );

        // Add it to Render
        renderItems.push(character);

        this.setState(
          {
            renderItems: renderItems,
            character: character,
            UIClassName: 'rolar-dados',
            turn: 'rolar-dados',
          },
          () => {
            // Finished
            this.state.scenario.centerScreen();
            this.loading(false);
          },
        );
      },
    );
  };

  /* - - - - - - */

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  /* Functions Object */

  logicObj = {
    /* common */
    getAsset: this.vars.globalAssets.getAsset,

    /* sets */
    setUsername: this.setUsername,
    setHostCode: this.setHostCode,
    setCharType: this.setCharType,

    /* menu */
    start: this.start,
    mainMenu: this.mainMenu,

    /* server */
    createHost: this.createHost,
    joinHost: this.joinHost,
    startMultiplayerGame: this.startMultiplayerGame,

    /* dices */
    rollDices: this.rollDices,

    /* turns */
    finishRollDiceTurn: this.finishRollDiceTurn,
    finishActionTurn: this.finishActionTurn,
    finishMonstersTurn: this.finishMonstersTurn,
  };

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // React Default
  render() {
    return (
      <GameContext.Provider value={{ state: this.state, logic: this.logicObj }}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}

export { GameProvider, GameContext };
