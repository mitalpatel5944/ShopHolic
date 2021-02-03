//Global Libraries
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {colors, fonts, images} from '../../theme';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

function PlaceOrder() {
  const navigation = useNavigation();
  const renderLoading = () => (
    <View style={{alignSelf: 'center', backgroundColor: colors.white}}>
      <Text
        style={{
          fontFamily: fonts.pbo,
          alignSelf: 'center',
          color: 'red',
          fontSize: 20,
        }}>
        Your Box is on Way!
      </Text>
      <Text
        style={{
          fontFamily: fonts.pbo,
          alignSelf: 'center',
          color: colors.lightGrey,
          fontSize: 14,
        }}>
        Order Number #123ACF
      </Text>

      <LottieView
        source={images.done}
        style={{width: 400, height: 400}}
        autoPlay={true}
        loop={false}
      />
      <Text
        style={{
          fontFamily: fonts.pbo,
          alignSelf: 'center',
          color: colors.Pink,
          fontSize: 20,
        }}>
        Scheduled Arrival Date
      </Text>
      <Text style={{fontFamily: fonts.pbo, alignSelf: 'center', fontSize: 14}}>
        Tuesday, February 22
      </Text>
      <View style={{margin: 20}}>
        <Button
          icon="check"
          mode="contained"
          dark={true}
          color={'red'}
          onPress={() => {
            navigation.navigate('MyOrder');
          }}
          style={{borderRadius: 40, marginHorizontal: 30}}>
          View Order History
        </Button>
      </View>
    </View>
  );

  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      {renderLoading()}
    </View>
  );
}

export default PlaceOrder;
