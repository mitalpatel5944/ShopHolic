import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import {Badge} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import moment from 'moment';

//custom
import {colors, fonts} from '../../theme';
import {PRODUCTLIST, ADD_TO_CART} from '../../redux/ActionType';
import styles from '../styles';
import {db} from '../../database';

//functional based Component
function Cart() {
  const dispatch = useDispatch();
  const ProductList = (item) => dispatch({type: PRODUCTLIST, payload: item});
  const cartItems = useSelector((state) => state);
  console.log('cartItems', cartItems);
  const navigation = useNavigation();

  const getCart = () => {
    let BigData = cartItems.productList.filter(function (e) {
      return e.cartSize > 0;
    });
    dispatch({type: ADD_TO_CART, payload: BigData});
  };

  const checkForAddItem = (item) => {
    updateSingleItemCartSize(item, item.id, true);
  };

  const checkForMinusItem = (item) => {
    updateSingleItemCartSize(item, item.id, false);
  };

  const getOfflineCart = (item, flag) => {
    let temp = cartItems.productList;
    temp.map((i, index) => {
      if (i.id == item.id) {
        temp[index] = item;
      }
    });
    ProductList(temp);
    getCart();
  };

  const updateSingleItemCartSize = (item, CartId, flag) => {
    let temp = 0;
    if (flag) {
      temp = parseInt(item.cartSize) + 1;
    } else {
      temp = parseInt(item.cartSize) - 1;
    }
    if (temp > 0) {
      let params = {
        cartSize: temp,
        description: item.description,
        title: item.title,
        id: item.id,
        price: item.price,
        image: item.image,
      };
      getOfflineCart(params, flag);
    } else {
      cartItems.productList.map((i) => {
        if (i.id == item.id) {
          i['cartSize'] = 0;
        }
      });
      ProductList(cartItems.productList);
      getCart();
    }
  };

  const deleteCart = (item) => {
    let temp = cartItems.productList;
    temp.map((i, index) => {
      if (i.id == item.id) {
        i['cartSize'] = 0;
      }
    });
    ProductList(temp);
    getCart();
  };

  const createOrder = () => {
    db.ref('/cartData').push({
      data: cartItems.cartList,
      createAt: moment().format('DD-MM-YYYY hh:mm'),
      user: cartItems.isLogin,
    });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
    let temp = cartItems.productList;
    temp.map((i, index) => {
      i['cartSize'] = 0;
    });
    ProductList(temp);
    getCart();
  };

  const placeorder = () => {
    createOrder();
    navigation.navigate('PlaceOrder');
  };

  const renderCheckout = () => (
    <View>
      <View style={{backgroundColor: colors.lightGrey, height: 2}} />
      <TouchableOpacity
        style={styles.checkoutbtn}
        onPress={() => {
          placeorder();
        }}>
        <Text style={styles.checkouttxt}> Checkout</Text>
      </TouchableOpacity>
    </View>
  );
  const renderProduct = () => {
    return (
      <FlatList
        data={cartItems.cartList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{flex: cartItems.cartList.length == 0 ? 1 : 0}}
        ListEmptyComponent={() => (
          <View style={{justifyContent: 'center', flex: 1}}>
            <Text
              style={{
                color: colors.black,
                textAlign: 'center',
                fontSize: 30,
                fontFamily: fonts.pre,
              }}>
              Empty Cart!
            </Text>
          </View>
        )}
        renderItem={({item, index}) => {
          return (
            <View style={styles.main}>
              <View style={styles.mainSub}>
                <View>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      borderRadius: 10,
                      backgroundColor: colors.white,
                      height: 100,
                      width: 100,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View style={{paddingLeft: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.catHeader}>{item.title}</Text>
                    <Badge
                      size={30}
                      style={{
                        backgroundColor: colors.black,
                        alignSelf: 'flex-start',
                      }}
                      onPress={() => {
                        deleteCart(item);
                      }}>
                      <MaterialCommunityIcons
                        name="delete"
                        color={colors.white}
                        size={15}
                      />
                    </Badge>
                  </View>

                  <Text style={[styles.catHeaderSub]} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: Dimensions.get('window').width / 1.7,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[{paddingHorizontal: 5, color: colors.Pink}]}>
                      {'$' + item.price}
                    </Text>
                    <View style={{flexDirection: 'row', paddingRight: 20}}>
                      <Badge
                        size={30}
                        onPress={() => {
                          checkForMinusItem(item);
                        }}
                        style={{backgroundColor: colors.black}}>
                        -
                      </Badge>

                      <Text style={styles.cartSize}>{item.cartSize}</Text>
                      <Badge
                        size={30}
                        onPress={() => {
                          checkForAddItem(item);
                        }}
                        style={{backgroundColor: colors.black}}>
                        +
                      </Badge>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      {renderProduct()}
      {cartItems.cartList.length != 0 && renderCheckout()}
    </View>
  );
}

export default Cart;
