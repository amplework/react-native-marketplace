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
  input: {
    height: 40,
  },
  rowButtons: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btnFacebook: {
    width: '48%',
  },
  btnContinue: {
    width: '50%',
    backgroundColor: COLORS.white,
  },
  textContinue: {
    color: COLORS.clearBlue,
  },
  dropInput: {
    marginTop: 16,
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderColor: COLORS.border,
    borderWidth: 1,
    color: COLORS.black,
    padding: 8,
  },
  positionIcon: {
    top: 26,
    right: 8,
  },
  chevronStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  btnSend: {
    marginTop: 32,
    backgroundColor: COLORS.clearBlue,
  },
  textSend: {
    color: COLORS.white,
  },
});

export default styles;
