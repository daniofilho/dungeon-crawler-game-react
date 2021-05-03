import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EngineProvider from 'engine/EngineProvider';

import SplashScreen from 'pages/SplashScreen';
import MainMenu from 'pages/MainMenu';
import Settings from 'pages/Settings';
import Game from 'pages/Game';
import Instructions from 'pages/Instructions';

const Router: React.FC = () => (
  <EngineProvider>
    <Switch>
      <Route path="/" exact component={SplashScreen} />
      <Route path="/main-menu" component={MainMenu} />
      <Route path="/settings" component={Settings} />
      <Route path="/instructions" component={Instructions} />
      <Route path="/game" component={Game} />
    </Switch>
  </EngineProvider>
);

export default Router;
