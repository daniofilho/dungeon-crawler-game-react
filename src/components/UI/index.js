import React, { Component } from 'react';
import { DivUI } from './style';
import { GameContext } from '../../engine/GameProvider';
import Dice from './Dice';

export default class UI extends Component {

  renderDices() {
    let dices = this.context.state.charProps.dices;
    if( this.isEmpty( dices ) ) return;
    return (
      <table>
        <tbody>
          <tr>
            <td><Dice number={dices[0]} /></td>
            <td><Dice number={dices[1]} /></td>
            <td><Dice number={dices[2]} /></td>
            <td><Dice number={dices[3]} /></td>
            <td><Dice number={dices[4]} /></td>
            <td><Dice number={dices[5]} /></td>
          </tr>
        </tbody>
      </table>
    );
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  render() {
    const props = this.context.state;
    return (
      <DivUI className={props.UIClassName}>
        
        <ul>
          <li>Turno: {props.turnLabel}</li>
        </ul>

        <div id="turno-rolar-dados">
          <a href="#!" onClick={ () => { this.context.logic.rolarDados() }}>Rolar Dados!</a>
        </div>

        {this.renderDices()}

      </DivUI>
    );
  }
}
UI.contextType = GameContext;
