//Global Libraries
import React from 'react';
import {View, Text} from 'react-native';

import {colors, fonts} from '../../theme';

function Landing() {
  const renderLoading = () => (
    <View
      style={{
        alignSelf: 'center',
        backgroundColor: colors.black,
        height: 100,
        width: 100,
        borderRadius: 100,
      }}>
      <Text
        style={{
          fontFamily: fonts.pbo,
          alignSelf: 'center',
          color: colors.white,
          fontSize: 30,
        }}>
        Shop{'\n'}Holic
      </Text>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: 'center',
      }}>
      {renderLoading()}
    </View>
  );
}

export default Landing;
