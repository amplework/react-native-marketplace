import { StyleSheet, Platform, Dimensions } from 'react-native';
import COLORS from 'utils/colors';
import { isSmallDevice } from 'utils/device';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: isSmallDevice ? 22 : 32
  },
  logo: {
    alignSelf: 'flex-start',
    height: isSmallDevice ? 50 : 60,
    width: isSmallDevice ? 50 : 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: isSmallDevice ? 20 : 24,
    lineHeight: isSmallDevice ? 28 : 32,
    fontFamily: FONTS.bold,
  },
  description: {
    alignSelf: 'flex-start',
    fontSize: isSmallDevice ? 14 : 16,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    marginBottom: isSmallDevice ? 10 : 22,
  },
  rowNewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: isSmallDevice ? 10 : 20,
  },
  getStartTitle: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  getStartActive: {
    marginLeft: 4,
    fontFamily: FONTS.bold,
    color: COLORS.clearBlue,
  },
  rowItems: {
    marginVertical: isSmallDevice ? 12 : 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowButtons: {
    position: 'absolute',
    bottom: Platform.OS == 'android' ? 20 : 15,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnLogin: {
    padding: isSmallDevice ? 10 : 16,
  },
  textLogin: {
    fontSize: isSmallDevice ? 14 : 16,
  },
  btnFacebook: {
    width: '100%',
    top: 10,
    backgroundColor: COLORS.duskyBlue,
    padding: isSmallDevice ? 10 : 16,
  },
  btnGoogle: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: isSmallDevice ? 10 : 16,
  },
  btnApple: {
    width: '100%',
    bottom: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: isSmallDevice ? 10 : 16,
  },
  textGoogle: {
    color: COLORS.black,
    marginLeft: 4,
    fontSize: isSmallDevice ? 14 : 16,
  },
  textFacebook: {
    marginLeft: 4,
    fontSize: isSmallDevice ? 14 : 16,
  },
  checkboxContainer: {
    alignSelf: 'flex-start',
  },
  forgotText: {
    color: COLORS.clearBlue,
    fontSize: 12,
    fontFamily: FONTS.book,
  },
});

export default styles;
