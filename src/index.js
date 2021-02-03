import React from 'react';
import App from './app';
import {LogBox} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import store from './redux/store';

LogBox.ignoreAllLogs = true;
function Kernel() {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
}

export default Kernel;
