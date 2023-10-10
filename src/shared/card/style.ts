import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { shadow } from 'utils/styles';

export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    ...shadow(),
  },
  spacingVertical: {
    marginBottom: 16,
  },
  spacingBoth: {
    marginBottom: 16,
    marginHorizontal: 24,
  },
  cardHeader: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.whiteGray,
  },
  cardFooter: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: COLORS.whiteGray,
  },
});
