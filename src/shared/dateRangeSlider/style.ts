import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const dateRangeSliderStyles = StyleSheet.create({
  slider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: COLORS.orange10,
  },
  doubleArrow: {
    flexDirection: 'row',
    marginHorizontal: 8,
  },
});
