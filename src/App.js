import React, { Component } from 'react';

import MainMenu from './components/MainMenu';
import GameScenes from './components/GameScenes';

import { Provider } from "mobx-react";
import { RootStore } from './stores/RootStore';

let store = new RootStore();

console.clear();

export default class App extends Component {

  runGame() {
		document.getElementById('first-screen').style.display = "none";
		store.game.run();
	}

  render() {
		return (
      <Provider store={store}>
        <MainMenu />
        <GameScenes />
      </Provider>
    );
  }

}
