import React, { Component } from "react";
import { DivInput } from "./style";

export default class Input extends Component {
  render() {
    return (
      <DivInput>
        <input
          type={this.props.type}
          readOnly={this.props.readOnly}
          onChange={this.props.onChange}
          className={this.props.className}
          id={this.props.id}
          defaultValue={this.props.defaultValue}
        />
      </DivInput>
    );
  }
}
