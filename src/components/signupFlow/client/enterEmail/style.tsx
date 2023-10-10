import { StyleSheet, Platform } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  logoPositions: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: 40,
  },
  logo: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  appName: {
    marginLeft: 8,
    fontSize: 28,
    fontFamily: FONTS.bold,
  },
  underName: {
    marginLeft: 8,
    fontSize: 12,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    lineHeight: 32,
    fontFamily: FONTS.bold,
  },
  description: {
    alignSelf: 'flex-start',
    color: COLORS.brownishGrey,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.book,
    marginBottom: 32,
  },
  rowNewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  getStartTitle: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
  },
  getStartActive: {
    marginLeft: 4,
    color: COLORS.clearBlue,
    fontFamily: FONTS.bold,
  },
  rowButtons: {
    position: 'absolute',
    bottom: Platform.OS == 'android' ? 20 : 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnFacebook: {
    width: '100%',
    top: 10,
    backgroundColor: COLORS.duskyBlue,
  },
  btnGoogle: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnApple: {
    width: '100%',
    bottom: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textGoogle: {
    color: COLORS.black,
    marginLeft: 4,
  },
  textFacebook: {
    marginLeft: 4,
  },
  checkboxContainer: {
    alignSelf: 'flex-start',
    marginVertical: 20,
  },
  buttonPosition: {
    marginTop: 20,
  },
});

export default styles;
