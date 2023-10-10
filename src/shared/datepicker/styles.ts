import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { isIOS } from 'utils/device';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...padding(10, 12, 10, 12),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 5,
  },
  label: {
    position: 'absolute',
    zIndex: 2,
    top: isIOS ? -8 : -10,
    paddingHorizontal: 4,
    marginLeft: 8,
    backgroundColor: COLORS.white,
    color: COLORS.warmGrey,
    fontSize: 12,
  },
  text: {
    fontFamily: FONTS.medium,
    color: COLORS.eerieBlack,
    fontSize: 14,
    lineHeight: 20,
  },
  icon: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  daysSection: {
    flexDirection: 'row',
    marginBottom: 20,
    ...padding(18, 22, 18, 22),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.whiteTwo,
  },
  dayCheckbox: {
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  textBook: {
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    lineHeight: 24,
    fontSize: 16,
  },
  textBook2: {
    fontFamily: FONTS.book,
    color: COLORS.brownishGrey,
    fontSize: isIOS ? 16 : 14,
  },
});
