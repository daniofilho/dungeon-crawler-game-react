import React, { Component } from 'react';

import { DivMainMenu } from './style';

export default class MainMenu extends Component {
  render() {
		return (
			<DivMainMenu>
				
				<div id="first-screen">
					<ul className="menu">
						<li><a href="#!" id="start-game-button">Iniciar Jogo</a></li>
					</ul>
				</div>

			</DivMainMenu>
		);
  }
}