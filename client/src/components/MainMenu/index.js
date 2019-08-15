import React, { Component } from 'react';
import { GameContext } from '../../engine/GameProvider';
import { DivMainMenu } from './style';

import Loading from '../Loading/index';
import Button from '../Button';

import LevelNewGame from './level-new-game';
import LevelMultiplayer from './level-multiplayer';

export default class MainMenu extends Component {

  render() {
		const context = this.context;
		const firstScreenStyle = {
			display: context.state.fistScreenDisplay
		}
		return (
			<DivMainMenu>
							
				<div id="first-screen" style={firstScreenStyle}>
					<ul className="menu">
						<li>
							<Button theme={'blue'} onClick={context.logic.start} label={'Iniciar Jogo'} />
						</li>
					</ul>
				</div>

				<div id="mainMenu" className={context.state.mainMenuClass}>

					<ul className="menu level-menu">
						<li><Button theme={'blue'} onClick={ () => { context.logic.mainMenu('menu-new') }} label={'Novo Jogo'} /></li>
						<li><Button theme={'blue'} onClick={ () => { context.logic.mainMenu('multiplayer') }} label={'Multijogador'} /></li>
						<li><Button theme={'blue'} onClick={ () => { context.logic.mainMenu('load') } } label={'Carregar Jogo'} /></li>
						<li><Button theme={'blue'} onClick={ () => { context.logic.mainMenu('instructions') } } label={'Instruções'} /></li>
						<li><Button theme={'blue'} onClick={ () => { context.logic.mainMenu('credits') } } label={'Créditos'} /></li>
					</ul>
		
					<LevelNewGame />

					<LevelMultiplayer />

				</div>

				<Loading />
							
			</DivMainMenu>
		);
  }
}

MainMenu.contextType = GameContext;