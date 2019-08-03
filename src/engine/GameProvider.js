import React, { Component } from 'react';

import { Scenario } from './Scenario';
import { GlobalAssets } from './GlobalAssets';

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
			
			/* Scenario */
			scenario: false,

			/* Render */
			renderItems: {}
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

		/* New Game */
			
			startNewGame = ( saveData, charType ) => {

			// # Init
				this.defaultEventListeners();

			// # Scenario
				this.setState(
					{ 
						scenario: new Scenario(this.state) 
					}, 
					//callback
					() => {
						
						// "render" items
						this.setState(
							{ 
								renderItems: this.state.scenario.getRenderItems() 
							},
							// Callback
							() => {

								// Cria o Char
								this.setState( 
									{
										character: this.state.globalAssets.getAsset( 'tile', { charType: charType }, false )
									},
									() => {
										// Como passar o Component como sendo um objeto/classe?
										//console.log(this.state.scenario.initialTile);
										//this.state.character.setStartPosition( this.state.scenario.initialTile.getCenterX(), this.state.scenario.initialTile.getCenterY() );
										//this.state.scenario.initialTile.setContent( this.character );

										// Finished
										this.state.scenario.centerScreen();
										this.loading(false);
									}
								);
								

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
			getAsset: this.state.globalAssets.getAsset
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