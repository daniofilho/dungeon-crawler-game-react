import React, { Component } from "react";
import { DivUI } from "./style";
import { GameContext } from "../../engine/GameProvider";
import Dice from "./Dice";

import Turnos from "./Turnos";

export default class UI extends Component {
  renderDices() {
    let props = this.context.state.charProps;
    let li = [];
    for (let index = 0; index < props.diceQty; index++) {
      li.push(
        <li key={index}>
          <Dice number={props.dices[index].value} />
        </li>
      );
    }
    return <ul className="dices">{li}</ul>;
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
