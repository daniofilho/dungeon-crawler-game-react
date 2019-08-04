import React, { Component } from 'react';
import { DivRolagemDados } from './style';
import { GameContext } from '../../../../engine/GameProvider';

import Dice from '../../Dice';

export default class RolagemDados extends Component {
  
  renderDices() {
    let dices = this.context.state.charProps.dices;
    return (
      <ul className='dices'>
        { dices.map( (value, index) => {
          return ( 
            <li key={index}>
              <Dice number={value} />
              {/*<br/>
              <input type="checkbox" id={ 'chk_dice_' + index} name="keep-dice" value={value} />
              <label htmlFor={ 'chk_dice_' + index}>Manter</label>*/}
            </li> );
        })}
      </ul>
    );
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
            
            <a href="#!" onClick={ () => { logic.rolarDados() }}>
              Rerolar Dados! <br/> 
              <small>restam: {props.rolagensRestantes}</small>
            </a>

            <a href="#!" onClick={ () => { logic.manterDados() }}>
              Ficar com esses dados
            </a>

          </div>

        </div>

      </DivRolagemDados>
    );
  }
}
RolagemDados.contextType = GameContext;
