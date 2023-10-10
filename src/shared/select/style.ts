import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    paddingVertical: 9,
    paddingHorizontal: 8,
  },
});
