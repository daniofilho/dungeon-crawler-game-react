import React, { Component } from 'react';
import { DivMainMenu } from './style';
import Loading from '../Loading/index';

export default class MainMenu extends Component {

  render() {
		return (
			<DivMainMenu>
				
				<div id="first-screen">
					<ul className="menu">
						<li><a href="#!" id="start-game-button" onClick={this.runGame}>Iniciar Jogo</a></li>
					</ul>
				</div>

				<div id="mainMenu">

					<ul className="menu">
						<li><a href="#!">Novo Jogo</a></li>
						<li><a href="#!">Carregar Jogo</a></li>
						<li><a href="#!">Instruções</a></li>
						<li><a href="#!">Créditos</a></li>
					</ul>
		
					<div className="game-title">
						
						<h4>Escolha seu Personagem</h4>
					
						<ul className="menu">
							<li className="menu-new">
								<a href="#!" className="menu-item" data-action="new" data-char="char01"> 
									<img src="./assets/sprites/char01-avatar.png" id="char01" alt="char01" />
								</a>
							</li>
							<li className="menu-new">
								<a href="#!" className="menu-item" data-action="new" data-char="char02"> 
									<img src="./assets/sprites/char02-avatar.png" id="char02" alt="char02" />
								</a>
							</li>
						</ul>

					</div>

				</div>

				<Loading />

			</DivMainMenu>
		);
  }
}