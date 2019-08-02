/*
const gameProperties = require('../../gameProperties');
const Scenario = require('../../engine/assets/Scenario');
const Character = require('../../assets/Character');
const Render = require('./Render');
const UI = require('../ui/UI');
const GlobalAssets = require('../assets/GlobalAssets');

const Konva = require('konva'); // Lib Canvas
*/

export default class Game {

  constructor() {
    /*
    // FPS Control
    this.fpsInterval = null; 
    this.now = null;
    this.deltaTime = null; 
    this.elapsed = null;

    // Events
    this.keysDown = {};
    this.keysPress = {};

    // Pause
    this._pause = false;
    this.gameIsLoaded = false;

    // Items
    this.itemsState = new Object();

    // Game
    this.gameProps = new gameProperties();
    this.UI = null;
    
    this.gameReady = false;

    // Mouse Position
    this.mouseX0 = 0;
    this.mouseX = 0;
    this.mouseY0 = 0;
    this.mouseY = 0;
    this.pageX = 0;
    this.pageY = 0;

    // Renders
    this.renderStatic = null;
    this.renderUI     = null;

    this.globalAssets = new GlobalAssets( this.gameProps.chunkSize );

    // Sounds
    this.menuSoundSrc = "./sounds/main-menu.mp3";
    this.menuSound = false;

    this.successSoundSrc = "./sounds/scenarios/success.mp3";
    this.successSound = false;
    
    this.gameOverSoundSrc = "./sounds/scenarios/game-over.mp3";
    this.gameOverSound = false;

    this.scenarioSound = false;

    this.mouseDown = false;

    // Personagem
    this.char = false;

    // Turnos
    this.turnoAtual = 'dados';

    this.initSound();
    */
  }

  /*
    # Variáveis
  */

    //@observable variavel = false; 


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  /*
    # Funções
  */
 /*
    @action setVariavel( _bool) {
      this.variavel = _bool;
    }*/
/*
  initSound() {
    this.menuSound = new Howl({
      src: [this.menuSoundSrc],
      loop: true,
      volume: 0.6
    });
    this.menuSound.play();
    this.successSound = new Howl({
      src: [this.successSoundSrc],
      volume: 0.6
    });
    this.gameOverSound = new Howl({
      src: [this.gameOverSoundSrc]
    });
  }

  playSuccessSound() {
    this.scenarioSound.volume(0.2);
    this.successSound.play();
    this.successSound.on('end', () => { this.scenarioSound.volume(0.6); });
  }

  // Gets
  isGameReady() { return this.gameReady; }
  getChunkSize() { return this.gameProps.chunkSize; }

  getCanvasWidth()  { return this.gameProps.canvasWidth;  }
  getCanvasHeight() { return this.gameProps.canvasHeight; }
  
  getGameWidth()  { return this.gameProps.canvasWidth;  }
  getGameHeight() { return this.gameProps.canvasHeight; }

  // Sets
  setGameReady(bool) { this.gameReady = bool; }

  // # Key up handle
	handleKeyUp(keyCode) {
    
    // Pause
    if( keyCode == 27 && this.gameIsLoaded ) { // ESQ
      this.togglePause();
    }

    // Dialog
		if (keyCode == 32) { // Space or E
      if( this.scenario ) this.scenario.centerScreen();
		} 
  
  }
  
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

  // # Default Event Listeners
  defaultEventListeners() {

    // Menu Clicks
    let menuItem = document.getElementsByClassName('menu-item');
    let _this = this;

    for (var i = 0; i < menuItem.length; i++) {  
      menuItem[i].addEventListener('click', function() {
        _this.menuAction( this.getAttribute("data-action"), this.getAttribute("data-char") );
      }, false);
    }

    document.getElementById("btn-rolar-dados").addEventListener("click", function(e) {
      _this.rolaDados();
    });

    // # Keyboard Events
    window.addEventListener('keyup', function(e) {
      
      // Clear previous keys
      delete this.keysDown[e.keyCode];
     
      // Game Handle keyp
      this.handleKeyUp(e.keyCode);
      
    }.bind(this), false);

    //this.draggableCanvas();

  }

  // Permite se movimentar pelo canvas com o click e arrasta
  draggableCanvas() {
    
    let _this = this;

    window.addEventListener("mousedown", (e) => {
      this.mouseX0 = e.x;
      this.mouseY0 = e.y;
      this.pageX = window.scrollX;
      this.pageY = window.scrollY;
      _this.mouseDown = true;
    });
    
    window.addEventListener("mouseup", () => {
      _this.mouseDown = false;
    });

    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.x;
      this.mouseY = e.y;
    });

    window.addEventListener("resize", () => {
      if( this.scenario ) this.scenario.centerScreen();
      if( this.UI ) this.UI.calculateCenterX();
    });

  }

  updateScreenScroll() {
    
    if( this.turnoAtual != 'rodada' ) return;

    if( this.mouseDown ) {
      document.body.style.cursor = 'grabbing';
      let scrollX = this.mouseX - this.mouseX0;
      let scrollY = this.mouseY - this.mouseY0;

      let x = this.pageX - scrollX;
      let y = this.pageY - scrollY;
      window.scrollTo( x, y );
    } else {
      document.body.style.cursor = 'default';
    }
  }

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

  // # Start/Restart a Game

  refreshVariables() {

    // Clear save state
    localStorage.removeItem('dungeonexplorer__itemsState');

    // Renders
    this.itemsState = new Object();

    this.UI = null;
    
    // Renders
    this.renderLayers = null;
    this.renderUI     = null;

  }

  startNewGame( saveData, charType ) {

    this.refreshVariables();
    
    // # Init
      
      /*
      let canvasStatic = document.getElementById('canvas_static');
      let contextStatic = canvasStatic.getContext('2d');

      let canvasUI = document.getElementById('canvas_ui');
      let contextUI = canvasUI.getContext('2d');

      canvasStatic.width = this.gameProps.getProp('canvasWidth');
      canvasStatic.height = this.gameProps.getProp('canvasHeight');

      canvasUI.width = window.innerWidth;
      canvasUI.height = window.innerHeight;
      *//*

      let stageStatic = new Konva.Stage({
        container: 'canvas_static',
        width: this.gameProps.getProp('canvasWidth'),
        height: this.gameProps.getProp('canvasHeight')
      });
      let layerStatic = new Konva.Layer();
      stageStatic.add(layerStatic);
      layerStatic.clearBeforeDraw(true);
      
      let stageUI = new Konva.Stage({
        container: 'canvas_ui',
        width: window.innerWidth,
        height: window.innerHeight
      });
      let layerUI = new Konva.Layer();
      stageUI.add(layerUI);

    // # Scenario inicial

      this.scenario = new Scenario();

    // # UI
      
      this.UI = new UI( this.players, this.gameProps);

    // # Render

      this.renderStatic = new Render(stageStatic, layerStatic);
      this.renderUI     = new Render(stageUI, layerUI); 

      // Add items to be rendered
      this.renderStatic.setScenario(this.scenario); // set the scenario

    // Cria o personagem
      this.char = new Character( charType );
      this.char.setStartPosition( this.scenario.initialTile.getCenterX(), this.scenario.initialTile.getCenterY() );
      this.scenario.initialTile.setContent( this.char );
    
    // Make sure the game is not paused
      this.unpause();
    
    // Scenario sound
      //this.scenarioSound.play();

      this.redrawCanvas();

    // Flag 
      this.gameIsLoaded = true;
    
    // Ok, run the game now
      this.setGameReady(true);
      this.runGame( this.gameProps.getProp('fps') );	// GO GO GO

    // Hide Elements
      document.getElementById("mainMenu").classList.remove('show');
      this.loading(false);

    // Show Canvas
      document.getElementById('gameCanvas').classList.add('show');

    //Center Scenario
      this.scenario.centerScreen();

  }//newGame

    // # The Game Loop
    updateGame(deltaTime) {

      if( this.isPaused() ) return;
      
      // Controle o canvas através de click segura
      this.updateScreenScroll();

      // Inicializa estrutura de turnos
      this.turnosControl();
      
    }

    // # "Thread" tha runs the game
    runGame(fps) {
      this.fpsInterval = 1000 / fps;
      this.deltaTime = Date.now();
      this.startTime = this.deltaTime;
      this.gameLoop();
    }
    gameLoop() {
      
      // calc elapsed time since last loop
      this.now = Date.now();
      this.elapsed = this.now - this.deltaTime;

      // if enough time has elapsed, draw the next frame
      if ( this.elapsed > this.fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        this.deltaTime = this.now - (this.elapsed % this.fpsInterval);

        this.updateGame( this.deltaTime );

      }

      // Runs only when the browser is in focus
      // Request another frame
      requestAnimationFrame( this.gameLoop.bind(this) );

    }

    redrawCanvas() {
      
      // "Static" Render - Background
      this.renderStatic.clearArrayItems();
      this.renderStatic.addArrayItem(this.scenario.getStaticItems()); // Get all items from the scenario that needs to be rendered
      this.renderStatic.start();

      // UI Render
      this.renderUI.clearArrayItems();
      this.renderUI.addArrayItem( this.UI.getNewRenderItems());
      this.renderUI.start();

      console.log('redraw');
    }

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    
  /*

    Estrututura do turno:

    - Rola os dados
    - Se inimigo, batalha
    - Se armadilha, não anda
    - Ação do dado ( andar, curar )
    - Se sem dados, turno dos monstros

  *//*
  turnosControl() {
    switch( this.turnoAtual ) {
      case 'dados':
        document.getElementById('rolar-dados').classList.add('show');
        break;
      case 'rodada':
        document.getElementById('rolar-dados').classList.remove('show');

        break;
      case 'inimigos':
        break;
    }
  }

  // Rola os dados
    rolaDados() {
      // rola os dados
      this.char.rolaDados();
      this.turnoAtual = 'rodada';
      this.redrawCanvas();
    }

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
  
  // # Menu
  
  // @paused determine if the game came from a pause action or a new game (when page loads)
  mainMenu(paused) { 
    
    let divMenu = document.getElementById('mainMenu');

    // Set mainMenu class
    ( paused ) ? document.body.classList.add('paused') : '';
    ( paused ) ? '' : divMenu.classList.add('new-game');
    
    // Toggle Menu
    divMenu.classList.toggle('show');
    
  }
    // Handle Menu Action
    menuAction(action, char) {
      switch(action) {
        case 'continue':
          this.continueGame();
          break;
        case 'save':
          this.saveGame();
          break;
        case 'load':
          this.loadGame();
          break;
        case 'new':
          this.multiplayer = false;
          this.newGame(false, char);// false = won't load saveData
          break;
        case 'controls':
        case 'back-controls':
          document.getElementById('mainMenu').classList.toggle('show');
          document.getElementById('controls').classList.toggle('show');
          break;
      }
    }

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
  
  // # New Game
  newGame(saveData, charType) {
    
    if( this.menuSound ) {
      if( this.menuSound.playing() ) this.menuSound.stop();
    }

    this.pause();
    this.loading(true);
    setTimeout( () => {
      this.startNewGame(saveData, charType); 
    }, 500 );
  }

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

  // # Continue
  continueGame() {
    this.unpause();
  }

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
 
  // # Save
  saveGame() {
    if( confirm('Salvar o jogo atual irá sobreescrever qualquer jogo salvo anteriormente. Deseja continuar?') ) {
      
      // Save items state first
      this.scenario.saveItemsState();

      let saveData = new Object();

      // Scenario
      saveData.scenario = {
        items: this.getItemsState()
      }

      // Convert to JSON
      saveData = JSON.stringify(saveData);
      
      // Save on LocalStorage
      localStorage.setItem( 'dungeonexplorer__save', saveData );

      alert('Jogo salvo!');
    }
  }

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

  // # Save
  loadGame() {
    
    // # Get data from localstorage and converts to json
    let saveData = JSON.parse( localStorage.getItem('dungeonexplorer__save') );

    if( saveData ) {
      // Will be  multiplayer game?
      this.multiplayer = ( saveData ) ? saveData.multiplayer : false;

      // Replace items state on local storage with saved states
      localStorage.setItem( 'dungeonexplorer__itemsState', JSON.stringify( saveData.scenario.items ) );

      // Load Items itens
      for( let i in saveData.scenario.items ) {
        this.addItemState( saveData.scenario.items[i] );
      };

      // # Loads a new game with save data
      this.newGame(saveData); 
    } else {
      alert('Não há jogo salvo previamente.')
    }
  }

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

  // # Pause
  isPaused() { return this._pause; }
  pause() { 
    this._pause = true; 
    this.mainMenu(true);
    
    if( this.scenario ) this.scenario.sound.pause();

    //Hide Control screen
    document.getElementById('controls').classList.remove('show');
    
  }
  unpause() { 
    document.getElementById('mainMenu').classList.remove('show');
    this._pause = false; 
    
    this.menuSound.stop();
    if( this.scenario ) this.scenario.sound.play();
  }
  togglePause() { ( this.isPaused() ) ? this.unpause() : this.pause() }
  
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

  // # Loading
  loading(bool) {
    let display = ( bool ) ? 'flex' : 'none';
    document.getElementById('loading').style.display = display;
  }
  
  // # Loading
  gameOver(bool) {
    if( bool ) this._pause = true; 
    let display = ( bool ) ? 'flex' : 'none';
    document.getElementById('game-over').style.display = display;
    if( bool && this.gameOverSound ) {
      if( this.scenario ) this.scenario.sound.stop();
      this.gameOverSound.play();
    }
  }

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //

  /*
    Items State
    - This are functions that handles items states between changing of stages. This will make an item to not respawn if it was collected before
  *//*
  
    getItemsState() { return this.itemsState; }
    addItemState( item ) { 
      this.itemsState[item.name_id] = item;  
    }

    saveItemsState() {
      let itemsState = JSON.stringify( this.getItemsState() );
      localStorage.setItem( 'dungeonexplorer__itemsState', itemsState );
    }


// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
*/
  // # Run
  run() {
    /*
    // Hide Elements
    document.getElementById('mainMenu').classList.remove('show');
    document.getElementById('gameCanvas').classList.remove('show');
    this.loading(false);
    this.gameOver(false);

    // Start the event listeners
    this.defaultEventListeners();

    // Shows Menu
    this.mainMenu(false);

    // Auto load a game - debug mode
    if( window.autoStart ) this.newGame(false, 'char01');
  */
    alert('running game!');

  }

}