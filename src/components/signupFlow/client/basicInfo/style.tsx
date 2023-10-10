import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    lineHeight: 32,
    fontFamily: FONTS.bold,
  },
  description: {
    alignSelf: 'flex-start',
    fontFamily: FONTS.book,
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.brownishGrey,
    marginBottom: 32,
  },
  rowButtons: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'flex-end',
  },
  btnFacebook: {
    width: '48%',
  },
  btnContinue: {
    width: '48%',
    backgroundColor: COLORS.orange,
  },
  textContinue: {
    color: COLORS.white,
  },
});

export default styles;
