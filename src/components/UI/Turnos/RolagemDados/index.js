import React, { Component } from 'react';
import { DivRolagemDados } from './style';
import { GameContext } from '../../../../engine/GameProvider';
import Button from '../../../Button';
import Dice from '../../Dice';

export default class RolagemDados extends Component {
  
  keepDicesIndex = [];

  removeElement(array, value) {
    let newArray = [];
    array.map ( v => {
      if( v !== value ) newArray.push( v );
      return true;
    });
    return newArray;
  }

  keepDice = ( index ) => {
    if( this.keepDicesIndex.includes(index) ) {
      this.keepDicesIndex = this.removeElement( this.keepDicesIndex, index );
    } else {
      this.keepDicesIndex.push(index);
    }
  }

  renderDices() {
    let dices = this.context.state.charProps.dices;
    return (
      <ul className='dices'>
        { dices.map( (value, index) => {
          return ( 
            <li key={index}>
              <Dice number={value} />
              <br/>
              <input type="checkbox" id={ 'chk_dice_' + index} name="keep-dice" value={value} defaultChecked={false} />
              <label htmlFor={ 'chk_dice_' + index} onClick={ () => { this.keepDice(index) } } >Manter</label>
            </li> 
          );
        })}
      </ul>
    );
  }

  labelRerollDice() {
    return(
      <span>
        Rerolar Dados! <br/> 
        <small>restam: {this.context.state.rollsLeft}</small>
      </span>
    );
  }

  onEndDiceTurn() {
    console.log('ended!');
  }

  render() {
    const logic = this.context.logic;
    const props = this.context.state;
    return (
      <DivRolagemDados className={props.turn}>
        
        <label>Rolagem Dados</label>
        
        <div className="rolagem-dados">

          {this.renderDices()}

          <div className="button">
            <Button theme={'red'} onClick={ () => { logic.rollDices( this.keepDicesIndex ) }} label={ this.labelRerollDice() } />
            <br/>
            <Button theme={'blue'} onClick={ () => { logic.finishRollDiceTurn( this.onEndDiceTurn() ) }} label={'Ficar com esses dados'} />
          </div>

        </div>

      </DivRolagemDados>
    );
  }
}
RolagemDados.contextType = GameContext;
