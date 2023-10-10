import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const notificationSettingsStyles = StyleSheet.create({
  scrollView: {
    ...padding(24, 24, 92, 24),
  },
  primaryLabel: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 26,
  },
  secondaryLabel: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 24,
  },
  secondaryCheckbox: {
    marginLeft: 24,
    marginBottom: 6,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.whiteGray,
    backgroundColor: COLORS.white,
  },
});
