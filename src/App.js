import React, { Component } from 'react';

import MainMenu from './components/MainMenu';
import GameScenes from './components/GameScenes';

console.clear();

export default class App extends Component {

  render() {
		return (
      <React.Fragment>
        <MainMenu />
        <GameScenes />
      </React.Fragment>
    );
  }
}
