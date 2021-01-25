import React from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native'
import { Badge } from 'react-native-paper';
import { useSelector } from 'react-redux'

function ShoppingCartIcon() {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Cart')
      }}
      style={{ marginRight: 10,flexDirection:'row' }}>
      <MaterialCommunityIcons name="cart" color={colors.white} size={30} />
      <Badge size={20} style={{marginLeft : -10}}>{cartItems.cartList.length}</Badge>
    </TouchableOpacity>
  )
}

export default ShoppingCartIcon