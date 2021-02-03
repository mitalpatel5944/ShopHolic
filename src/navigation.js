import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Cart, Login, MyOrder, PlaceOrder} from './screens';
import {Appbar} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingCartIcon from './Component/ShoppingCartIcon';
import {useSelector} from 'react-redux';

function CustomNavigationBar({navigation, previous}) {
  return (
    <Appbar.Header>
      <Appbar.Content title={'ShopHolic'} />
      <ShoppingCartIcon {...navigation} />
    </Appbar.Header>
  );
}

function CustomForLogin({navigation, previous}) {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={'ShopHolic'} />
    </Appbar.Header>
  );
}

const Stack = createStackNavigator();

function App() {
  const isLoggedIn = useSelector((state) => state);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {isLoggedIn.isLogin.length == 0 ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              header: (props) => <CustomForLogin {...props} />,
            }}
          />
        ) : (
          // When logged in, the user will be shown this route
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: (props) => <CustomNavigationBar {...props} />,
            }}
          />
        )}
        <Stack.Screen
          name="PlaceOrder"
          component={PlaceOrder}
          options={{title: ''}}
        />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="MyOrder" component={MyOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
