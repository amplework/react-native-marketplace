import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
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
  checkboxContainer: {
    marginTop: 16,
    marginLeft: 2,
  },
  checkBoxLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    lineHeight: 20,
    color: COLORS.black,
  },
  textContinue: {
    color: COLORS.white,
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
});

export default styles;
