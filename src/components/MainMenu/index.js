import React, { Component } from 'react';
import { GameContext } from '../../engine/GameProvider';
import { DivMainMenu } from './style';

import Loading from '../Loading/index';

import LevelNewGame from './level-new-game';

export default class MainMenu extends Component {

  render() {
		return (
			<DivMainMenu>
				<GameContext.Consumer>
					{(context) => (
            <React.Fragment>
							
							<div id="first-screen">
								<ul className="menu">
									<li><a href="#!" id="start-game-button" onClick={context.logic.start}>Iniciar Jogo</a></li>
								</ul>
							</div>

							<div id="mainMenu">

								<ul className="menu level-menu">
									<li><a href="#!" onClick={ () => { context.logic.mainMenu('menu-new') } }>Novo Jogo</a></li>
									<li><a href="#!" onClick={ () => { context.logic.mainMenu('load') } }>Carregar Jogo</a></li>
									<li><a href="#!" onClick={ () => { context.logic.mainMenu('instructions') } }>Instruções</a></li>
									<li><a href="#!" onClick={ () => { context.logic.mainMenu('credits') } }>Créditos</a></li>
								</ul>
					
								<LevelNewGame />

							</div>

							<Loading />
						</React.Fragment>
					)}
				</GameContext.Consumer>
			</DivMainMenu>
		);
  }
}