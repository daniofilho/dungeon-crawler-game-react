import React, { Component } from 'react';
import { DivGameScene } from './style';
import { GameContext } from '../../engine/GameProvider';

export default class GameScenes extends Component {

  renderItems(){
    let renderItems = this.context.state.renderItems;
    if( ! Array.isArray( renderItems ) ) return;
    return (
      <div>
        {renderItems.map((value, index) => {
          return <div key={index}>{value}</div>
        })}
      </div>
    )
  }

  render() {
    return (
      <DivGameScene>
        { this.renderItems() }
      </DivGameScene>
    );
  }
}
GameScenes.contextType = GameContext;
