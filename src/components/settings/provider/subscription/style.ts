import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const subscriptionStyles = StyleSheet.create({
  container: {
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
  },
  cancel: {
    marginTop: 10,
    borderWidth: 2,
    backgroundColor: COLORS.white,
    borderColor: COLORS.orangeRed,
  },
  cancelText: {
    color: COLORS.orangeRed,
  },
  upgrade: {
    marginTop: 'auto',
    borderWidth: 2,
    backgroundColor: COLORS.white,
    borderColor: COLORS.clearBlue,
  },
  upgradeText: {
    color: COLORS.clearBlue,
  },
});
