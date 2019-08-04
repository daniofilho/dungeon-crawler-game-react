import React, { Component } from 'react';
import { DivTile } from './style';

export default class Tile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: this.props.gameProps.tileSize,
      height: this.props.gameProps.tileSize,
      x: this.props.componentProps.x,
      y: this.props.componentProps.y,
      isInitial: this.props.componentProps.isInitial
    }
  }

  static getCenterX() { return this.state.x + this.state.width / 2; }
  static getCenterY() { return this.state.y + this.state.height / 2; }
  
  setContent = (content) => {
    this.setState({content: content});
  }

  debug() {
    const debug = this.props.gameProps.debug.active;
    if(!debug) return;
    return(
      <span>
        {this.state.x}x{this.state.y}
      </span>
    );
  }
  
	render() {
    const style = {
      width: this.state.width + 'px',
      height: this.state.height + 'px',
      left: this.state.x + 'px',
      top: this.state.y + 'px'
    }
    return (
      <DivTile 
        ref={this.myRef}
        props={this.state}
        style= {style}
      >
        { this.debug() }
      </DivTile>
    );
  }

}