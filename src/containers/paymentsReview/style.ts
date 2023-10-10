import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding, shadow } from 'utils/styles';

export const paymentsReviewStyles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
  },
  titleReview: {
    color: COLORS.white60,
    fontSize: 18,
    lineHeight: 26,
    fontFamily: FONTS.book,
  },
  headerReview: {
    backgroundColor: COLORS.twilightBlueTwo,
    shadowOpacity: 0,
  },
  section: {
    marginTop: 24,
    ...padding(6, 0, 6, 16),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
    ...shadow(),
  },
});
