//import logo from 'assets/logo.png';
import React from 'react';
import { HashRouter } from 'react-router-dom';

import GlobalStyle from 'styles/global';
import fonts from 'styles/common/fonts';

import { ChakraProvider } from '@chakra-ui/react';

import Routes from 'routes';

interface AppProps {
  title?: string;
}

interface AppState {
  counter: number;
}

class App extends React.Component<AppProps, AppState> {
  readonly state: AppState = { counter: 0 };

  render(): JSX.Element {
    return (
      <HashRouter>
        <ChakraProvider>
          <Routes />
        </ChakraProvider>

        {/* Workaround to import font and don't reload it on every rerender*/}
        <style>{fonts}</style>
        <GlobalStyle />
      </HashRouter>
    );
  }
}

export default App;
