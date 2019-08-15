import React, { Component } from 'react';
import io from 'socket.io-client';
//import api from '../services/api';

import { Scenario } from './Scenario';
import { GlobalAssets } from './GlobalAssets';

import Character from '../components/game-assets/Character';

const GameContext = React.createContext();

class GameProvider extends Component {

	socket = false;

	/* constructor */

		state = {

			/* Debug */
			debug: {
				active: false,
				autoLoad: false
			},

			/* Config */
			username: null,
			tileSize: 150, //px - resolution
    	horizontalTiles: 20,
			verticalTiles: 20,

			/* mainMenu */
			fistScreenDisplay: 'flex',
			mainMenuClass: '',

			/* states */
			isLoading: false,
			mouseDown: false,

			/* screen vars */
			mouseX: 0,
			mouseY: 0,
			pageX: 0,
			pageY: 0,

			/* assets/components */
			globalAssets: false,

			/* Character */
			character: false,
			charProps: {
				lifes: 0,
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
				]
			},
			
			/* Scenario */
			scenario: false,
			initialTileProps: {
				x: 0,
				y: 0,
				centerX: 0,
				centerY: 0
			},

			/* UI */
			UIClassName: 'hide',

			/* Turns */
			turn: '',
				/* Dices */
				rollsLeft: 3222,

			/* Render */
			renderItems: []
		}

	/* Functions */

		componentDidMount() {
			if( this.state.debug.autoLoad ) this.start();
		}
		
		start = () => {
			this.setState(
				{ 
					fistScreenDisplay: 'none',
					mainMenuClass: 'show',
					globalAssets: new GlobalAssets(this.state) 
				},
				() => {
					if( this.state.debug.autoLoad ) this.mainMenu('new', 'char01');
				}
			);
			
		}

		/* loading */
			loading = (bool) => {
				this.setState({ isLoading: bool });
			}

		/* Main Menu */
			
			mainMenu = (action, param) => {
				switch(action){
					case 'menu-new':
						this.setState({ mainMenuClass: 'show new' });
						break;
					case 'multiplayer':
						this.setState({ mainMenuClass: 'show multiplayer' });
						break;
					case 'new':
						this.setState({ mainMenuClass: ''});
						this.loading(true);
						setTimeout( () =>{
							this.startNewGame( false, param );
						}, 500);
						break;
					default:
						alert('Em desenvolvimento');
						break;
				}
			}

		/* - - - - - - */

		/* Event Listeners */
			
			defaultEventListeners = () => {
				// # Keyboard Events
				window.addEventListener('keyup', function(e) {
      	 this.handleKeyUp(e.keyCode);	
				}.bind(this), false);
		
				this.draggableCanvas();
			}

			handleKeyUp = (keyCode) => {
				// Dialog
				if (keyCode === 32) // Space 
					if (this.state.scenario) this.state.scenario.centerScreen();
			}

			// Allow to move the screen with mouse click
			draggableCanvas = () => {

				window.addEventListener("mousedown", (e) => {
					this.setState({
						mouseDown: true,
						mouseX0: e.x,
						mouseY0: e.y,
						pageX: window.scrollX,
						pageY: window.scrollY
					});
				});
				
				window.addEventListener("mouseup", () => {
					this.setState({	mouseDown: false });
				});

				window.addEventListener("mousemove", (e) => {
					this.setState({
						mouseX: e.x,
						mouseY: e.y
					});
					//window.mouse
					this.updateScreenScroll();
				});

				window.addEventListener("resize", () => {
					if( this.state.scenario ) this.state.scenario.centerScreen();
				});

			}

			updateScreenScroll = () => {
				
				if( this.state.mouseDown && this.state.turn === 'acoes' ) {
					document.body.style.cursor = 'grabbing';
					let scrollX = this.state.mouseX - this.state.mouseX0;
					let scrollY = this.state.mouseY - this.state.mouseY0;

					let x = this.state.pageX - scrollX;
					let y = this.state.pageY - scrollY;
					window.scrollTo( x, y );
				} else {
					document.body.style.cursor = 'default';
				}
			}

		/* - - - - - - */

		/* Username */
			getUsername = () => {
				return this.state.username;
			}
			setUsername = (username) => {
				this.setState({
					username: username
				})
			}

		/* - - - - - - */
		
		/* Roll Dices */
			
			getADiceRoll(keepIndex) {
				let dices = {};
				for( let index = 0; index<this.state.charProps.diceQty; index++) {
					if( keepIndex && keepIndex.includes(index) ) {
						dices[index] = this.state.charProps.dices[index];
					} else {
						dices[index] = { value: Math.floor(Math.random() * 6) + 1, isUsed: false };
					}
				}
				return dices;
			}

			rollDices = ( keepIndex ) => {
				if( this.state.rollsLeft > 0 ) {
					this.setState( prevState => ({
						charProps: {
							...prevState.charProps,
							dices: this.getADiceRoll(keepIndex)
						},
						rollsLeft: this.state.rollsLeft - 1
					}));
				}
			}
			finishRollDiceTurn = (callback) => {
				this.setState( 
					{
						turn: 'acoes',
						UIClassName: 'acoes'
					},
					() => {
						if(callback) callback();
					}
				);
			}

		/* - - - - - - */

		/* Actions */

			finishActionTurn = () => {
				this.setState( 
					{
						turn: 'monstros',
						UIClassName: 'monstros'
					}
				);
			}

		/* - - - - - - */

		/* Monsters */

			finishMonstersTurn = () => {
				this.setState( prevState => ({
					charProps: {
						...prevState.charProps,
						dices: this.getADiceRoll()
					},
					rollsLeft: 3,
					turn: 'rolar-dados',
					UIClassName: 'rolar-dados'
				}));
			}

		/* - - - - - - */

		/* Server */	

			conn = () => {
				this.socket = io('http://localhost:3333', {
					query: { clientID: this.state.username }
				});
			}

			createHost = () => {	
				if( this.state.username !== null ) {
					this.conn();
					this.socket.emit('create-host');
					this.setState({ mainMenuClass: 'show multiplayer create-host' });
				} else {
					alert('Digite o nome de usuário antes.');
				}
			}

			joinHost = (action, param) => {
				switch(action) {
					default:
					case 'menu':
						this.setState({ mainMenuClass: 'show multiplayer join-host' });
						break;
					case 'init':

						break;
				}
			}

		/* - - - - - - */

		/* New Game */
			
			startNewGame = ( saveData, charType ) => {

				// # Init
				this.defaultEventListeners();

				// # Scenario
				let scenario = new Scenario(this.state) ;
				let initialTileProps = scenario.getInitialStateProps();

				// # Render Items
				let renderItems = scenario.getRenderItems();
			
				// # Char	
				let charProps = {};
				charProps.x = initialTileProps.centerX;
				charProps.y = initialTileProps.centerY; 

				// # Set States and finish
					this.setState(prevState => (
						{
							charProps: {
								...prevState.charProps,
								x: charProps.x,
								y: charProps.y,
								dices: this.getADiceRoll()
							},
							scenario: scenario,
							initialTileProps: initialTileProps
						}),
						() => {

							let character = <Character charType={charType} saveData={saveData} gameProps={this.state} />

							// Add it to Render
							renderItems.push( character );

							this.setState(
								{
									renderItems: renderItems,
									character: character,
									UIClassName: 'rolar-dados',
									turn: 'rolar-dados'
								},
								() => {
									
									// Finished
									this.state.scenario.centerScreen();
									this.loading(false);

								}
							);
						
						}
						
					);

			}

		/* - - - - - - */

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	/* Functions Object */

		logicObj = {
			
			/* common */
			getAsset: this.state.globalAssets.getAsset,

			/* username */
			setUsername: this.setUsername,

			/* menu */
			start: this.start,
			mainMenu: this.mainMenu,

			/* server */
			createHost: this.createHost,
			joinHost: this.joinHost,
			
			/* dices */
			rollDices: this.rollDices,
			
			/* turns */
			finishRollDiceTurn: this.finishRollDiceTurn,
			finishActionTurn: this.finishActionTurn,
			finishMonstersTurn: this.finishMonstersTurn
			
		}

	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

	// React Default
  render() {
		return (
			<GameContext.Provider value={{ state: this.state, logic: this.logicObj }}>
				{this.props.children}
			</GameContext.Provider>
		)
  }

}

export { 
  GameProvider, 
  GameContext 
}