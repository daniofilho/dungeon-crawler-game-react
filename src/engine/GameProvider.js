import React, { Component } from 'react';

import { Scenario } from './Scenario';
import { GlobalAssets } from './GlobalAssets';

import Character from '../components/game-assets/Character';

const GameContext = React.createContext();

class GameProvider extends Component {
	
	/* constructor */

		state = {
			/* Debug */
			debug: {
				active: false,
				autoLoad: false
			},

			/* Config */
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
				dices: []
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

			/* Turnos */
			turn: '',
				/* Rolagem Dados */
				rolagensRestantes: 3,

			/* Render */
			renderItems: []
		}

	/* Functions */
		
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
				
				if( this.state.mouseDown ) {
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
		
		/* Rolar Dados */
			
			
			rolarDados = () => {
				if( this.state.rolagensRestantes > 0 ) {
					let dices = [];
					for( let i = 1; i<=6; i++) {
						dices.push( Math.floor(Math.random() * 6) + 1 );
					}
					this.setState( prevState => ({
						charProps: {
							...prevState.charProps,
							dices: dices
						},
						rolagensRestantes: this.state.rolagensRestantes - 1
					}));
				}
			}
			manterDados = () => {
				this.setState( 
					{
						turn: 'acoes',
						UIClassName: 'acoes'
					}
				);
			}

		/* - - - - - - */

		/* Ações */

			acoesEncerrar = () => {
				this.setState( 
					{
						turn: 'monstros',
						UIClassName: 'monstros'
					}
				);
			}

		/* - - - - - - */

		/* Monstros */

			monstrosEncerrar = () => {
				let dices = [];
				for( let i = 1; i<=6; i++) {
					dices.push( Math.floor(Math.random() * 6) + 1 );
				}
				this.setState( prevState => ({
					charProps: {
						...prevState.charProps,
						dices: dices
					},
					rolagensRestantes: 3,
					turn: 'rolar-dados',
					UIClassName: 'rolar-dados'
				}));
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

				// Faz uma rolagem inicial de dados
				let dices = [];
				for( let i = 1; i<=6; i++) {
					dices.push( Math.floor(Math.random() * 6) + 1 );
				}

				// # Set States and finish
					this.setState(prevState => (
						{
							charProps: {
								...prevState.charProps,
								x: charProps.x,
								y: charProps.y,
								dices: dices
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
			start: this.start,
			mainMenu: this.mainMenu,
			getAsset: this.state.globalAssets.getAsset,
			rolarDados: this.rolarDados,
			manterDados: this.manterDados,
			acoesEncerrar: this.acoesEncerrar,
			monstrosEncerrar: this.monstrosEncerrar
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