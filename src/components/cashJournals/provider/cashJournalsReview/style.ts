import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { padding, shadow } from 'utils/styles';

export const cashJournalsReviewStyles = StyleSheet.create({
  headerBar: {
    backgroundColor: COLORS.twilightBlueTwo,
    shadowOpacity: 0,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  section: {
    marginTop: -32,
    ...padding(6, 0, 6, 16),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
    ...shadow(),
  },
});
