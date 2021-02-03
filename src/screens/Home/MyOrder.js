//Global Libraries
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, Dimensions} from 'react-native';
import {colors, fonts, images} from '../../theme';
import styles from '../styles';
import {db} from '../../database';

function MyOrder() {
  const [myOrder, setMyorder] = useState([]);
  useEffect(() => {
    dataGet();
  }, []);

  const dataGet = () => {
    db.ref('/cartData').on('value', (querySnapShot) => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      // console.log('Data', );
      setMyorder(Object.values(data));
    });
  };
  const renderItem = (i) => {
    console.log('i', i);
    return (
      <FlatList
        data={i.item.data}
        keyExtractor={(item) => 'i' + item.id}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.main}>
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
                  <Text style={styles.catHeader}>{item.title}</Text>
                  <Text style={[styles.catHeaderSub]} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      // width: Dimensions.get('window').width / 1.7,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[{paddingHorizontal: 5, color: colors.Pink}]}>
                      {'$' + item.price}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
    );
  };

  const renderLoading = () => (
    <FlatList
      data={myOrder}
      showsVerticalScrollIndicator={false}
      
      keyExtractor={(item) => 'j' + item.id}
      renderItem={(item, index) => {
        console.log(item);
        return (
          <View key={index} style={styles.mainOuter}>
            <Text style={{textAlign: 'right', fontFamily: fonts.pbo}}>
              {item.item.createAt}
            </Text>
            {renderItem(item)}
          </View>
        );
      }}
    />
  );

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      {renderLoading()}
    </View>
  );
}

export default MyOrder;
