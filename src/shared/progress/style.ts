import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const progressStyles = StyleSheet.create({
  progressTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  border: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.orange10,
  },
});
