import React, { Component } from 'react';

const GameContext = React.createContext();

class GameProvider extends Component {
	
	/* constructor */
		state = {
			/* Loading */
			isLoading: false
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
			mainMenu = (action) => {
				switch(action){
					case 'menu-new':
						document.getElementById('mainMenu').classList.add('new');
						break;
					case 'new':
						document.getElementById('mainMenu').classList.remove('show', 'new');
						this.loading(true);
						setTimeout( () => {
							this.loading(false);
							alert('Jogo começou!!!')
						}, 2000);
						break;
					default:
						alert('Em desenvolvimento');
						break;
					
				}
			}
		/* - - - - - - */


	/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
	/* Functions Object */

		logicObj = {
			start: this.start,
			mainMenu: this.mainMenu
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