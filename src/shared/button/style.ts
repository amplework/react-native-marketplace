import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const buttonStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 16,
    backgroundColor: COLORS.clearBlue,
    borderRadius: 50,
  },
  text: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.bold,
  },
  loader: {
    padding: 0.25,
  },
  addButton: {
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: COLORS.orange,
  },
});
