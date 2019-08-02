import React, { Component } from 'react';
import { GameContext } from '../../engine/GameProvider';
import { DivLoading } from './style';

export default class Loading extends Component {
	render() {
		return (
			<React.Fragment>
				<GameContext.Consumer>
					{(context) => (
            <DivLoading id="loading" className={ context.state.isLoading ? 'show' : '' }>
							<p>Loading</p>
						</DivLoading>
					)}
				</GameContext.Consumer>
			</React.Fragment>
			
		);
  }
}