import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const navigationStyles = StyleSheet.create({
  list: {
    paddingLeft: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...padding(20, 24, 20, 4),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  listItemText: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 16,
    lineHeight: 24,
  },
});
