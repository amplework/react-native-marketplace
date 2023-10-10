import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const twinCounterStyles = StyleSheet.create({
  twinCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 7,
  },
  border: {
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
  },
  sign: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: 14,
    lineHeight: 32,
    marginRight: 4,
  },
});
