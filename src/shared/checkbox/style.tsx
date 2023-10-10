import { Platform, StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    fontSize: 14,
    marginLeft: Platform.OS === 'ios' ? 8 : 16,
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  disabled: {
    color: COLORS.warmGrey,
  },
  strikeThorugh: {
    textDecorationLine: 'line-through',
    textDecorationColor: COLORS.black60
  },
  labelContainer: { 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  }
});

export default styles;
