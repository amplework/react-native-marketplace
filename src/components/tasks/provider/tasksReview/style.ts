import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import { padding, shadow } from 'utils/styles';

export const tasksReviewStyles = StyleSheet.create({
  headerBar: {
    backgroundColor: COLORS.twilightBlueTwo,
    shadowOpacity: 0,
  },
  safe: {
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
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
