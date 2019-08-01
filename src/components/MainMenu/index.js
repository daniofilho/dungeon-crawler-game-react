import React, { Component } from 'react';
import { DivMainMenu } from './style';
import Game from '../../engine/Game';
import Loading from '../Loading/index';

export default class MainMenu extends Component {

	componentDidMount() {
		
  }
	
	runGame() {
		document.getElementById('first-screen').style.display = "none";
		let game = new Game();
		window.game = game;
		game.run();
	}

  render() {
		return (
			<DivMainMenu>
				
				<div id="first-screen">
					<ul className="menu">
						<li><a href="#!" id="start-game-button" onClick={this.runGame}>Iniciar Jogo</a></li>
					</ul>
				</div>

				<div id="mainMenu">
        
					<div className="game-title">
						<img src="./img/logo.png" width="200" alt="logo" />
						<h4>Escolha seu Personagem</h4>
					</div>
        
        	<ul className="menu">
          
						<li className="menu-new">
							<a href="#!" class="menu-item" data-action="new" data-char="char01"> 
								<img src="./assets/sprites/char01-avatar.png" id="char01" alt="char01" />
							</a>
						</li>
						
						<li className="menu-new">
							<a href="#!" class="menu-item" data-action="new" data-char="char02"> 
								<img src="./assets/sprites/char02-avatar.png" id="char02" alt="char02" />
							</a>
						</li>

        	</ul>

      	</div>

				<Loading />

			</DivMainMenu>
		);
  }
}