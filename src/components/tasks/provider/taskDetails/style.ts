import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 24,
    backgroundColor: COLORS.white,
  },
  detailsCard: {
    paddingVertical: 4,
    paddingLeft: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
  },
  disabled: {
    backgroundColor: COLORS.warmGrey,
  },
});
