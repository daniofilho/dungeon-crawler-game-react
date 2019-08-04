import React, { Component } from 'react';
import { DivDice } from './style';
import { GameContext } from '../../../engine/GameProvider';

export default class Dice extends Component {
  
  render() {
    return (
      <DivDice props={this.props}></DivDice>
    );
  }
}
Dice.contextType = GameContext;
