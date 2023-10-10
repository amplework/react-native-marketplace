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
  root: { padding: 20, minHeight: 300 },
  fieldRow: {
    marginTop: 20,
    flexDirection: 'row',
  },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 55,
    fontSize: 24,
    fontFamily: FONTS.book,
    textAlign: 'center',
    marginLeft: 8,
    borderWidth: 1,
    borderColor: COLORS.brownishGrey,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  focusCell: {
    borderColor: COLORS.black,
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
    textDecorationLine: 'underline',
    color: COLORS.clearBlue,
    fontFamily: FONTS.bold,
  },
  expireText: {
    marginTop: 24,
    fontSize: 16,
    fontFamily: FONTS.book,
  },
});

export default styles;
