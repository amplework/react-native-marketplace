import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const taxesStyles = StyleSheet.create({
  taxesList: {
    ...padding(16, 0, 16, 16),
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  taxesItemText: {
    fontSize: 14,
    fontFamily: FONTS.book,
    color: COLORS.black,
  },
});
