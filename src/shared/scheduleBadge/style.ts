import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const scheduleBadgeStyles = StyleSheet.create({
  scheduleBadge: {
    padding: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 5,
  },
});
