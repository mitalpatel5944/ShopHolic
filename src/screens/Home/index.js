import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { Badge } from 'react-native-paper';
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux'

//custom
import apis from '../../lib/apis'
import log from '../../lib/log'
import { colors, fonts } from "../../theme";
import { PRODUCTLIST, ADD_TO_CART } from '../../redux/ActionType'
import styles from '../styles'
//functional based Component
function Home() {
    const [isLoading, setisLoading] = useState(true);
    const dispatch = useDispatch();
    const ProductList = item => dispatch({ type: PRODUCTLIST, payload: item });
    const cartItems = useSelector(state => state);

    useEffect(() => {
        getProduct();
    }, []);

    //api call

    const getProduct = () => {
        apis.getProduct()
            .then((res) => {
                setisLoading(false);
                log.success("Succesfully get item", res);
                if (res.status == 200) {
                    res.data.map(i => {
                        i['cartSize'] = 0;
                    })
                    ProductList(res.data);
                }
            })
            .catch((err) => {
                setisLoading(false)
                log.error("failed get item", err)
            })
    }

    const getCart = () => {
        let BigData = cartItems.productList.filter(function (e) {
            return e.cartSize > 0;
        });
        dispatch({ type: ADD_TO_CART, payload: BigData })
    }


    const checkForAddItem = (item) => {
        updateSingleItemCartSize(item, item.id, true)
    }

    const checkForMinusItem = (item) => {
        updateSingleItemCartSize(item, item.id, false)
    }

    const getOfflineCart = (item, flag) => {
        let temp = cartItems.productList
        temp.map((i, index) => {
            if (i.id == item.id) {
                temp[index] = item
            }
        })
        ProductList(temp);
        getCart()
    }

    const updateSingleItemCartSize = (item, CartId, flag) => {
        let temp = 0
        if (flag) {
            temp = parseInt(item.cartSize) + 1
        } else {
            temp = parseInt(item.cartSize) - 1
        }
        if (temp > 0) {
            let params = {
                cartSize: temp,
                description: item.description,
                title: item.title,
                id: item.id,
                price: item.price,
                image: item.image
            }
            getOfflineCart(params, flag)
        } else {
            cartItems.productList.map(i => {
                if (i.id == item.id) {
                    i['cartSize'] = 0
                }
            })
            ProductList(cartItems.productList)
            getCart()
        }
    }


    const renderProduct = () => {
        return (
            <FlatList
                data={cartItems.productList}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => 'i' + item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.main}>
                            <View style={styles.mainSub}>
                                <View>
                                    <Image source={{ uri: item.image }} style={{
                                        borderRadius: 10, backgroundColor: colors.white,
                                        height: 100, width: 100, resizeMode: 'contain'
                                    }} />
                                </View>
                                <View style={{ paddingLeft: 10 }}>
                                    <Text style={styles.catHeader}>{item.title}</Text>
                                    <Text style={[styles.catHeaderSub]} numberOfLines={2}>{item.description}</Text>
                                    <View style={{ flexDirection: 'row', width: Dimensions.get('window').width / 1.7, justifyContent: 'space-between' }}>
                                        <Text style={[{ paddingHorizontal: 5, color: colors.Pink }]}>{'$' + item.price}</Text>
                                        <View style={{ flexDirection: 'row', paddingRight: 20, }}>
                                            <Badge size={30} onPress={() => {
                                                checkForMinusItem(item)
                                            }} style={{ backgroundColor: colors.black }}>-</Badge>
                                            <Text style={styles.cartSize}>{item.cartSize}</Text>
                                            <Badge size={30} onPress={() => {
                                                checkForAddItem(item)
                                            }} style={{ backgroundColor: colors.black }}>+</Badge>

                                        </View>
                                    </View>
                                </View>
                            </View>

                        </View>
                    )
                }}
            />
        )
    }

    //loader
    const renderActivityLoader = () => (
        isLoading ?
            <ActivityIndicator size={50} color={colors.black} /> :
            cartItems.productList.length == 0 ? <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}><Text>No Records found</Text></View> :
                <View />
    )

    return (
        <View style={{ flex: 1 }}>
            {renderActivityLoader()}
            {renderProduct()}
        </View>
    );
}

export default Home;
