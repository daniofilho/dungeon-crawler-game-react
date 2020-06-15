import React, { Component } from 'react';
import { GameContext } from 'engine/GameProvider';
import { DivLoading } from './style';

export default class Loading extends Component {
  render() {
    const { isLoading } = this.context.state;
    return (
      <DivLoading id="loading" className={isLoading ? 'show' : ''}>
        <p>Loading</p>
      </DivLoading>
    );
  }
}

Loading.contextType = GameContext;
