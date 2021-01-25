import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { Home, Cart } from './screens'
import { Appbar, Badge } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingCartIcon from './Component/ShoppingCartIcon'

function CustomNavigationBar({ navigation, previous }) {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={"ShopHolic"} />
      <ShoppingCartIcon {...navigation} />
    </Appbar.Header>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} options={{
          header: (props) => (
            <CustomNavigationBar
              {...props}
            />
          )
        }} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;