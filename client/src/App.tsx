import React, { Component } from 'react';
import { GameProvider } from './engine/GameProvider';

import MainMenu from './components/MainMenu';
import GameScenes from './components/GameScenes';
import UI from './components/UI';

import { GlobalStyle } from './assets/styles/global';

console.clear();

export default class App extends Component {
  render() {
    return (
      <GameProvider>
        <MainMenu />
        <GameScenes />
        <UI />
        <GlobalStyle />
      </GameProvider>
    );
  }
}
