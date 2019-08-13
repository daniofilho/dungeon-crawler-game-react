import React, { Component } from 'react';
import { DivButton } from './style';

export default class Button extends Component {
 
  render() {
    var style = {};

    switch ( this.props.theme ) {

      default:
      case 'blue':
        style = {
          color: '#FFFFFF',
          backgroundColor: '#1F6096',
          border: '5px solid #163D5C',
          textShadow: '2px 2px #000',
          boxShadow: '1px 1px 1px 0px #000'
        };
        break;
      case 'red':
        style = {
          color: '#FFFFFF',
          backgroundColor: '#96043E',
          border: '5px solid #5B1647',
          textShadow: '2px 2px #000',
          boxShadow: '1px 1px 1px 0px #000'
        };
        break;
      case 'green':
        style = {
          color: '#FFFFFF',
          backgroundColor: '#52AA8A',
          border: '5px solid #388659',
          textShadow: '2px 2px #000',
          boxShadow: '1px 1px 1px 0px #000'
        };
        break;

    }
    
    return (
      <DivButton>
        
        <a 
          style={style} 
          href={ this.props.href ? this.props.href : '#!' } 
          onClick={this.props.onClick} 
          className={this.props.className}
          id={this.props.id}
        >
          {this.props.label}
        </a>
        
      </DivButton>
    );
  }
}