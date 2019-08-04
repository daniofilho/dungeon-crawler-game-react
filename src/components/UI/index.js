import React, { Component } from 'react';
import { DivUI } from './style';
import { GameContext } from '../../engine/GameProvider';
import Dice from './Dice';

import Turnos from './Turnos';

export default class UI extends Component {

  renderDices() {
    let dices = this.context.state.charProps.dices;
    return (
      <ul className='dices'>
        { dices.map( (value, index) => {
          return ( <li key={index}><Dice number={value} /></li> );
        })}
      </ul>
    );
  }
  
  render() {
    const props = this.context.state;
    return (
      <DivUI className={props.UIClassName}>
        
        {this.renderDices()}

        <Turnos />

      </DivUI>
    );
  }
}
UI.contextType = GameContext;
