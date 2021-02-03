import React, {useState, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Router from '../navigation';
import Landing from '../screens/landing';
import {colors} from '../theme';
import {LOGIN} from '../redux/ActionType';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.black,
    accent: 'yellow',
  },
};
function App() {
  const [Splash, setSplash] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = (item) => dispatch({type: LOGIN, payload: item});

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
    getUserId();
  }, []);

  getUserId = async () => {
    var token = await AsyncStorage.getItem('user').then((value) => {
      console.log('value', value);
      if (value != null) {
        isLoggedIn(value);
      } else {
        isLoggedIn('');
      }
    });
  };
  return (
    <View style={{flex: 1}}>
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={colors.black} barStyle={'dark'} />
        {Splash ? <Landing /> : <Router />}
      </PaperProvider>
    </View>
  );
}

export default App;
