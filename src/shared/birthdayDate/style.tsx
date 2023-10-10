import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderColor: COLORS.border,
    borderWidth: 1,
    color: COLORS.black,
    padding: 8,
  },
  birthdateLabel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  arrow: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default styles;
