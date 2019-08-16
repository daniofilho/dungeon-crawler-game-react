import React, { Component } from "react";
import { DivChar } from "./style";

import char01_avatar from "../../../assets/sprites/char01-avatar.png";
import char02_avatar from "../../../assets/sprites/char02-avatar.png";

export default class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charType: this.props.charType,
      charImage: char01_avatar,
      x: this.props.gameState.charProps.x,
      y: this.props.gameState.charProps.y,
      width: this.props.gameVars.tileSize * 0.5,
      height: this.props.gameVars.tileSize * 0.5
    };
  }

  setCharType = type => {
    switch (type) {
      default:
      case "char01":
        this.setState({ charImage: char01_avatar });
        break;
      case "char02":
        this.setState({ charImage: char02_avatar });
        break;
    }
  };

  componentDidMount() {
    this.setCharType(this.state.charType);
  }

  render() {
    return <DivChar props={this.state} />;
  }
}
