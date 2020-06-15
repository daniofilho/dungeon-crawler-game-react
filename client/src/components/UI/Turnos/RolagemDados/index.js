import React, { Component } from 'react';
import { DivRolagemDados } from './style';
import { GameContext } from '../../../../engine/GameProvider';
import Button from '../../../Button';
import Dice from '../../Dice';

export default class RolagemDados extends Component {
  defautlDiceCheck = {
    0: { isChecked: false },
    1: { isChecked: false },
    2: { isChecked: false },
    3: { isChecked: false },
    4: { isChecked: false },
    5: { isChecked: false },
  };

  keepDicesIndex = [];

  state = {
    dicesChecked: this.defautlDiceCheck,
  };

  removeElement(array, value) {
    let newArray = [];
    array.map((v) => {
      if (v !== value) newArray.push(v);
      return true;
    });
    return newArray;
  }

  keepDice = (index) => {
    if (this.keepDicesIndex.includes(index)) {
      this.keepDicesIndex = this.removeElement(this.keepDicesIndex, index);
    } else {
      this.keepDicesIndex.push(index);
    }
  };

  checkChkBox = (index) => {
    this.setState((prevState) => ({
      dicesChecked: {
        ...prevState.dicesChecked,
        [index]: {
          isChecked: !this.state.dicesChecked[index].isChecked,
        },
      },
    }));
  };

  labelOnClickHandle = (index) => {
    this.keepDice(index);
    this.checkChkBox(index);
  };

  renderDices() {
    let props = this.context.state.charProps;
    let li = [];
    for (let index = 0; index < props.diceQty; index++) {
      li.push(
        <li key={index}>
          <Dice number={props.dices[index].value} />
          <br />
          <input
            type="checkbox"
            id={'chk_dice_' + index}
            name="keep-dice"
            value={props.dices[index].value}
            defaultChecked={this.state.dicesChecked[index].isChecked}
          />
          <label
            className={this.state.dicesChecked[index].isChecked + ''}
            onClick={() => {
              this.labelOnClickHandle(index);
            }}
          >
            Manter
          </label>
        </li>,
      );
    }
    return <ul className="dices">{li}</ul>;
  }

  labelRerollDice() {
    return (
      <span>
        Rerolar Dados! <br />
        <small>restam: {this.context.state.rollsLeft}</small>
      </span>
    );
  }

  onEndDiceTurn() {
    // Reset checkbox status for a new dice roll
    this.setState({ dicesChecked: this.defautlDiceCheck });
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
            <Button
              theme="red"
              onClick={() => {
                logic.rollDices(this.keepDicesIndex);
              }}
            >
              {this.labelRerollDice()}
            </Button>
            <br />
            <Button
              theme={'blue'}
              onClick={() => {
                logic.finishRollDiceTurn(this.onEndDiceTurn());
              }}
            >
              Ficar com esses dados
            </Button>
          </div>
        </div>
      </DivRolagemDados>
    );
  }
}
RolagemDados.contextType = GameContext;
