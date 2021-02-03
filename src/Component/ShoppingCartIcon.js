import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {LOGIN} from '../redux/ActionType';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ShoppingCartIcon() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = (item) => dispatch({type: LOGIN, payload: item});
  const cartItems = useSelector((state) => state);

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        AsyncStorage.removeItem('user');
        isLoggedIn('');
        navigation.navigate('Login');
        console.log('User signed out!');
      });
  };
  return (
    <View style={{marginRight: 10, flexDirection: 'row'}}>
      <TouchableOpacity
        style={{marginRight: 10}}
        onPress={() => {
          navigation.navigate('MyOrder');
        }}>
        <MaterialCommunityIcons
          name="order-bool-ascending"
          color={colors.white}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart');
        }}
        style={{marginRight: 10, flexDirection: 'row'}}>
        <MaterialCommunityIcons name="cart" color={colors.white} size={30} />
        <Badge size={20} style={{marginLeft: -10}}>
          {cartItems.cartList.length}
        </Badge>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}>
        <MaterialCommunityIcons name="logout" color={colors.white} size={30} />
      </TouchableOpacity>
    </View>
  );
}

export default ShoppingCartIcon;
