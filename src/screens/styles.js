import {StyleSheet, Dimensions} from 'react-native';
import {colors, fonts} from '../theme';

const styles = StyleSheet.create({
  mainOuter: {
    paddingRight: 5,
    justifyContent: 'space-between',
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.lightGrey,
  },
  main: {
    flexDirection: 'row',
    paddingRight: 5,
    justifyContent: 'space-between',
    borderRadius: 10,
    margin: 10,
    backgroundColor: colors.lightGrey,
  },
  mainSub: {
    flexDirection: 'row',
    backgroundColor: colors.lightGrey,
    padding: 10,
    justifyContent: 'space-between',
  },
  scrollStyle: {
    justifyContent: 'center',
    backgroundColor: colors.black,
    flex: 1,
    paddingHorizontal: 10,
  },
  catHeader: {
    paddingHorizontal: 5,
    width: Dimensions.get('window').width / 2,
    fontFamily: fonts.pbo,
  },
  cartSize: {
    paddingHorizontal: 5,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fonts.pbo,
  },
  catHeaderSub: {
    paddingHorizontal: 5,
    fontSize: 10,
    width: Dimensions.get('window').width / 2,
    fontFamily: fonts.pbo,
  },
  checkouttxt: {
    color: colors.white,
    fontFamily: fonts.pbo,
    textAlign: 'center',
  },
  checkoutbtn: {
    backgroundColor: colors.black,
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    margin: 10,
  },
});

export default styles;
