import React, { Component } from 'react';

import { Scenario } from './Scenario';
import { GlobalAssets } from './GlobalAssets';

const GameContext = React.createContext();

class GameProvider extends Component {
	
	/* constructor */
		state = {
			/* Loading */
			isLoading: false,
			/* global assets/components */
			globalAssets: new GlobalAssets(this),
			/* Scenario */
			scenario: false,
			/* Render */
			renderItems: {}
		}


	/* Functions */
		
		start = () => {
			document.getElementById('first-screen').style.display = "none";
			document.getElementById('mainMenu').classList.add('show');
		}

		/* loading */
			loading = (bool) => {
				this.setState({ isLoading: bool });
			}

		/* Main Menu */
			
			mainMenu = (action, param) => {
				switch(action){
					case 'menu-new':
						document.getElementById('mainMenu').classList.add('new');
						break;
					case 'new':
						document.getElementById('mainMenu').classList.remove('new', 'show');
						this.loading(true);
						this.startNewGame( false, param );
						break;
					default:
						alert('Em desenvolvimento');
						break;
				}
			}

		/* - - - - - - */

		/* New Game */
			
			startNewGame = ( saveData, charType ) => {

    		// # Init
					//this.refreshVariables(); => TODO
					//this.defaultEventListeners();

				// # Scenario
					this.setState({ scenario: new Scenario() }, () => {
						this.setState({ renderItems: this.state.scenario.getRenderItems() });
					});
					

				// Finished
					this.loading(false);
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