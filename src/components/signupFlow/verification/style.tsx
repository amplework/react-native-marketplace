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
    fontSize: 16,
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    marginBottom: 32,
  },
  rowButtons: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'flex-end',
  },
  btnContinue: {
    width: '48%',
    backgroundColor: COLORS.orange,
  },
  btnContinueDisabled: {
    backgroundColor: COLORS.brownishGrey,
  },
  textContinue: {
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
});

export default styles;
