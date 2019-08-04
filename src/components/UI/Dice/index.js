import React, { Component } from 'react';
import { DivDice } from './style';
import { GameContext } from '../../../engine/GameProvider';

export default class Dice extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number,
    }
  }

  render() {
    return (
      <DivDice props={this.state}>{this.state.number}</DivDice>
    );
  }
}
Dice.contextType = GameContext;
