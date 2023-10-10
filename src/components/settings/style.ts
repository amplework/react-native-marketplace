import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const styles = StyleSheet.create({
  settingsList: {
    paddingLeft: 20,
  },
  settingsListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...padding(20, 24, 20, 4),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
  settingsListItemText: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 16,
    lineHeight: 24,
  },
  settingsListItemIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  settingsListFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...padding(100, 0, 50, 0),
  },
  settingsListFooterText: {
    fontFamily: FONTS.book,
    color: COLORS.warmGrey,
    fontSize: 14,
    lineHeight: 20,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 9,
  },
});
