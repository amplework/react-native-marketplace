import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 32,
    backgroundColor: COLORS.white,
  },
  logo: {
    alignSelf: 'flex-start',
    height: 60,
    width: 60,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    lineHeight: 32,
    fontFamily: FONTS.bold,
  },
  description: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    marginBottom: 32,
  },
  rowNewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
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
    marginVertical: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowButtons: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnFacebook: {
    width: '48%',
    backgroundColor: COLORS.duskyBlue,
  },
  btnGoogle: {
    width: '48%',
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
  },
  forgotText: {
    color: COLORS.clearBlue,
    fontSize: 12,
    fontFamily: FONTS.book,
  },
});

export default styles;
