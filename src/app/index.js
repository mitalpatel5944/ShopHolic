import React, { Component } from "react";
import { StatusBar, View } from "react-native";
import Router from "../navigation";
import Landing from '../screens/landing'
import { colors } from "../theme";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux'
import store from '../redux/store'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.black,
    accent: 'yellow',
  },
};


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      Splash: true
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ Splash: false })
    }, 3000);
  }
  render() {
    return (
      <StoreProvider store={store}>
        <View style={{ flex: 1 }}>
          <PaperProvider theme={theme}>
            <StatusBar backgroundColor={colors.black} barStyle={'dark'} />
            {this.state.Splash ? <Landing /> : <Router />}
          </PaperProvider>
        </View>
      </StoreProvider>
    );
  }
}
